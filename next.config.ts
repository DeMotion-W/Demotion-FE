import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  images: {
    domains: [
      "demotion-s3-bucket.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
