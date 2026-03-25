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
uniform vec2 u_mouse;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / max(u_resolution.y, 1.0);
  
  // Mouse interaction
  vec2 mouse = u_mouse / u_resolution.xy;
  mouse = mouse * 2.0 - 1.0;
  mouse.x *= u_resolution.x / max(u_resolution.y, 1.0);
  
  // Distance to mouse
  float dist = length(p - mouse);
  float mouseEffect = exp(-dist * 2.5);

  float t = u_time * 0.15;
  
  // Domain warping
  vec2 q = vec2(0.);
  q.x = snoise(p * 0.6 + vec2(t, t * 0.5));
  q.y = snoise(p * 0.6 + vec2(t * 0.8, t * 1.2));
  
  vec2 r = vec2(0.);
  r.x = snoise(p * 0.6 + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t + mouseEffect * 0.2);
  r.y = snoise(p * 0.6 + 1.0 * q + vec2(8.3, 2.8) + 0.12 * t - mouseEffect * 0.2);
  
  float f = snoise(p * 0.6 + r);
  f = (f * 0.5) + 0.5;
  
  // Define colors for light mode
  vec3 lightBg = vec3(0.98, 0.98, 0.98); // background
  vec3 lightAccent1 = vec3(0.88, 0.96, 0.75); // soft lime
  vec3 lightAccent2 = vec3(0.72, 0.90, 0.33); // primary lime
  
  // Define colors for dark mode
  vec3 darkBg = vec3(0.067, 0.075, 0.094); // dark charcoal
  vec3 darkAccent1 = vec3(0.12, 0.22, 0.12); // dark green
  vec3 darkAccent2 = vec3(0.42, 0.83, 0.07); // primary lime
  
  vec3 bg = mix(lightBg, darkBg, u_dark);
  vec3 c1 = mix(lightAccent1, darkAccent1, u_dark);
  vec3 c2 = mix(lightAccent2, darkAccent2, u_dark);

  // Mix colors based on noise
  vec3 col = mix(bg, c1, smoothstep(0.1, 0.8, f));
  col = mix(col, c2, smoothstep(0.3, 0.9, r.x * r.y * 2.0 + mouseEffect * 0.5));
  
  // Add subtle vignette
  float vig = 1.0 - 0.15 * dot(p, p);
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
    const locMouse = gl.getUniformLocation(program, 'u_mouse');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let raf = 0;
    let dark = isDarkDocument();
    
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      // Invert Y for WebGL coordinates
      targetMouseY = rect.height - (e.clientY - rect.top);
    };
    
    window.addEventListener('mousemove', handleMouseMove);

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
      
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(locPos);
      gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(locRes, canvas.width, canvas.height);
      gl.uniform1f(locTime, timeSeconds);
      gl.uniform1f(locDark, dark);
      gl.uniform2f(locMouse, mouseX * (window.devicePixelRatio || 1), mouseY * (window.devicePixelRatio || 1));
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
      window.removeEventListener('mousemove', handleMouseMove);
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
