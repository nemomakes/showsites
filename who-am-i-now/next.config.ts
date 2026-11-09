import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
  // The playbook PDF is outside public/ and read at request time.
  outputFileTracingIncludes: {
    "/api/kit/download": ["./private/friend-finder-playbook.pdf"],
  },
};

export default nextConfig;
