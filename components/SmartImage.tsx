"use client";

import { useState } from "react";
import { driveImageUrl, driveImageFallback } from "@/lib/drive";

type Props = {
  src: string;
  alt: string;
  width?: number;
  className?: string;
};

/**
 * Hiển thị ảnh từ link Google Drive (hoặc link trực tiếp).
 * Tự đổi sang link dự phòng nếu link chính lỗi, và có ảnh trống mặc định.
 */
export default function SmartImage({ src, alt, width = 1200, className }: Props) {
  const primary = driveImageUrl(src, width);
  const fallback = driveImageFallback(src, width);
  const [current, setCurrent] = useState(primary || fallback);
  const [failed, setFailed] = useState(!src);

  if (failed || !current) {
    return (
      <div
        className={`flex items-center justify-center bg-brand-light text-brand/40 ${className ?? ""}`}
        aria-label={alt}
      >
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 5h18v14H3z" />
          <path d="M3 16l5-5 4 4 3-3 6 6" />
          <circle cx="8.5" cy="9" r="1.5" />
        </svg>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => {
        if (current !== fallback && fallback) setCurrent(fallback);
        else setFailed(true);
      }}
    />
  );
}
