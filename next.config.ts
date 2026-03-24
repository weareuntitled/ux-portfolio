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
  experimental: {
    optimizePackageImports: ["lucide-react", "tailwind-merge", "framer-motion"],
  },
};

export default withPayload(nextConfig);
