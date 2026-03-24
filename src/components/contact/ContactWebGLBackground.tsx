'use client';

import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_dark;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / max(u_resolution.y, 1.0);
  float t = u_time;
  float flow = sin(p.x * 1.35 + t * 0.11) * 0.5 + 0.5;
  float orb = exp(-length(p - vec2(sin(t * 0.095) * 0.82, cos(t * 0.088) * 0.52)) * 1.05);
  float orb2 = exp(-length(p - vec2(cos(t * 0.12) * 0.68, sin(t * 0.097) * 0.62)) * 1.35) * 0.55;
  float mist = sin(p.y * 2.8 + t * 0.07) * sin(p.x * 2.2 - t * 0.055) * 0.5 + 0.5;
  float mixAmt = smoothstep(0.15, 0.9, flow * 0.38 + orb + orb2 + mist * 0.12);

  vec3 light1 = vec3(0.99, 0.99, 0.98);
  vec3 light2 = vec3(0.90, 0.95, 0.88);
  vec3 light3 = vec3(0.91, 0.93, 0.99);
  vec3 dark1 = vec3(0.045, 0.05, 0.065);
  vec3 dark2 = vec3(0.08, 0.1, 0.085);
  vec3 dark3 = vec3(0.065, 0.075, 0.12);

  vec3 c1 = mix(light1, dark1, u_dark);
  vec3 c2 = mix(light2, dark2, u_dark);
  vec3 c3 = mix(light3, dark3, u_dark);
  vec3 col = mix(c1, mix(c2, c3, mixAmt), 0.5 + mixAmt * 0.22);
  float vig = 0.94 - dot(p, p) * 0.048;
  col *= vig;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function isDarkDocument() {
  if (typeof document === 'undefined') return 0;
  return document.documentElement.classList.contains('dark') ? 1 : 0;
}

export function ContactWebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const locPos = gl.getAttribLocation(program, 'a_position');
    const locRes = gl.getUniformLocation(program, 'u_resolution');
    const locTime = gl.getUniformLocation(program, 'u_time');
    const locDark = gl.getUniformLocation(program, 'u_dark');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let raf = 0;
    let dark = isDarkDocument();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 1 || h < 1) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const drawFrame = (timeSeconds: number) => {
      if (canvas.width < 2 || canvas.height < 2) return;
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(locPos);
      gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(locRes, canvas.width, canvas.height);
      gl.uniform1f(locTime, timeSeconds);
      gl.uniform1f(locDark, dark);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const ro = new ResizeObserver(() => {
      resize();
      drawFrame(reduceMotion ? 0 : (performance.now() - start) / 1000);
    });
    ro.observe(canvas);
    resize();

    const mo = new MutationObserver(() => {
      dark = isDarkDocument();
      drawFrame(reduceMotion ? 0 : (performance.now() - start) / 1000);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const loop = () => {
      drawFrame((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      drawFrame(0);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
