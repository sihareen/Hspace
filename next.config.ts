import type { NextConfig } from "next";

function getAllowedImageHostnames() {
  const hostnames = new Set<string>([
    "public.blob.vercel-storage.com",
    "*.public.blob.vercel-storage.com",
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      hostnames.add(new URL(siteUrl).hostname);
    } catch {
      // Ignore invalid env value.
    }
  }

  return [...hostnames];
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: getAllowedImageHostnames().map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
