import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cố định thư mục gốc (tránh nhầm do có nhiều lockfile ở thư mục cha)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
