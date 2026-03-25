import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";
import path from "path";
import { withPayload } from "@payloadcms/next/withPayload";

function extraImageRemotePatterns(): RemotePattern[] {
  const urls = [
    process.env.NEXT_PUBLIC_PROJECT_ASSET_BASE,
    "https://untitled-ux.de",
    "https://www.untitled-ux.de",
    "https://app.untitled-ux.de",
    "https://tracklistify.untitled-ux.de",
  ].filter(Boolean) as string[];

  const seen = new Set<string>();
  const out: RemotePattern[] = [];
  for (const raw of urls) {
    try {
      const u = new URL(raw);
      const key = `${u.protocol}//${u.host}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({
        protocol: u.protocol.replace(":", "") as "http" | "https",
        hostname: u.hostname,
        ...(u.port ? { port: u.port } : {}),
        pathname: "/**",
      });
    } catch {
      /* ignore invalid env */
    }
  }
  return out;
}

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
  // Standalone: next/image needs image-optimizer + sharp. Same glob key as Payload withPayload
  // (it appends @libsql/client to that entry — do not use a second key only for these paths).
  outputFileTracingIncludes: {
    "**/*": [
      "./node_modules/next/dist/server/image-optimizer.js",
      "./node_modules/sharp/**/*",
      "./node_modules/@img/sharp*/**/*",
    ],
  },
  serverExternalPackages: ["sharp"],
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      ...extraImageRemotePatterns(),
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [75, 80, 85, 100],
    minimumCacheTTL: 31536000,
  },
  /**
   * Dev: use in-memory webpack cache only. On Windows, persistent pack files under
   * `.next/cache/webpack` often corrupt (AV, OneDrive, deleting `.next` while dev runs),
   * causing MODULE_NOT_FOUND for numeric chunks, missing manifests, and ENOENT @swc.js.
   */
  webpack: (config, { dev, webpack }) => {
    if (dev) {
      config.cache = { type: "memory" };
    } else {
      const t0 = Date.now();
      config.plugins = config.plugins ?? [];
      config.plugins.push(
        new webpack.ProgressPlugin({
          activeModules: false,
          entries: false,
          modules: false,
          profile: false,
          handler(percentage: number, message: string, ...args: unknown[]) {
            const extra = args.filter(Boolean).join(" ");
            if (percentage === 0) {
              console.log("\n[build] Webpack compiling…\n");
            }
            const pct = Math.floor(percentage * 100);
            if (pct >= 1 && pct < 100 && pct % 12 === 0) {
              console.log(`[build] ${pct}% ${message}${extra ? ` ${extra}` : ""}`);
            }
            if (percentage === 1) {
              console.log(`[build] Webpack done in ${((Date.now() - t0) / 1000).toFixed(1)}s\n`);
            }
          },
        }),
      );
    }
    return config;
  },
};

export default withPayload(nextConfig);
