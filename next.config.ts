import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Đóng gói tối thiểu để chạy trong container (Cloud Run)
  output: "standalone",
  // Cố định thư mục gốc (tránh nhầm do có nhiều lockfile ở thư mục cha)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
