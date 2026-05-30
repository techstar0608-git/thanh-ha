import type { NextConfig } from "next";

// Chọn kiểu build qua biến môi trường:
//   - mặc định: "export" -> ra thư mục out/ (Hostinger Shared Hosting, host tĩnh)
//   - BUILD_STANDALONE=1: "standalone" -> server.js cho container (Cloud Run / VPS Node)
const isStandalone = process.env.BUILD_STANDALONE === "1";

const nextConfig: NextConfig = {
  output: isStandalone ? "standalone" : "export",
  // Ảnh trong app dùng <img> thuần, không qua trình tối ưu của Next -> an toàn cho export
  images: { unoptimized: true },
  // Sinh ra mỗi route 1 thư mục có index.html -> direct link chạy đúng trên host tĩnh
  trailingSlash: true,
  // Cố định thư mục gốc (tránh nhầm do có nhiều lockfile ở thư mục cha)
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
