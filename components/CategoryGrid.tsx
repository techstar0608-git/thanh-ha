"use client";

import Link from "next/link";
import { useMemo } from "react";
import { loaiKey, useProducts } from "@/lib/products";
import SmartImage from "./SmartImage";
import { Loading } from "./StateBlocks";
import type { Product } from "@/lib/types";

type Cat = { key: string; ten: string; soLuong: number; anh: string };

export default function CategoryGrid() {
  const { products, loading, error } = useProducts();

  const cats = useMemo<Cat[]>(() => {
    const map = new Map<string, Product[]>();
    for (const p of products) {
      const key = loaiKey(p);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return Array.from(map.entries()).map(([key, list]) => ({
      key,
      // Tên hiển thị lấy từ cột "Loại" của sản phẩm trong nhóm (mã loại không hiện).
      ten: list.find((p) => p.loai)?.loai || "Khác",
      soLuong: list.length,
      anh: list.find((p) => p.anhChinh)?.anhChinh ?? "",
    }));
  }, [products]);

  if (loading) return <Loading label="Đang tải danh mục…" />;
  if (error || !cats.length) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cats.map((c) => (
        <Link
          key={c.key}
          href={`/san-pham?loai=${encodeURIComponent(c.key)}`}
          className="group relative overflow-hidden rounded-2xl border border-line bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <div className="aspect-[16/10] bg-brand-soft overflow-hidden">
            <SmartImage
              src={c.anh}
              alt={c.ten}
              width={700}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/85 via-brand-darker/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-lg font-bold drop-shadow">{c.ten}</h3>
            <p className="text-sm text-white/85">{c.soLuong} sản phẩm</p>
          </div>
          <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-brand-dark flex items-center justify-center font-bold group-hover:bg-accent group-hover:text-white transition-colors">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
