"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loaiKey, useProducts } from "@/lib/products";
import ProductCard from "./ProductCard";
import { Loading, ErrorBlock, EmptyBlock } from "./StateBlocks";

const ALL = "all";

export default function ProductsGrid() {
  const initialLoai = useSearchParams().get("loai") ?? undefined;
  const { products, loading, error } = useProducts();
  const [sel, setSel] = useState<string>(initialLoai || ALL);

  // Mỗi nhóm = { key (mã loại để lọc), label (tên Loại để hiển thị) }
  const categories = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of products) {
      const key = loaiKey(p);
      if (!map.has(key)) map.set(key, p.loai || "Khác");
    }
    return [
      { key: ALL, label: "Tất cả" },
      ...Array.from(map, ([key, label]) => ({ key, label })),
    ];
  }, [products]);

  // Nếu lọc theo nhóm không hợp lệ (sau khi tải xong), quay về "Tất cả"
  useEffect(() => {
    if (!loading && sel !== ALL && !categories.some((c) => c.key === sel)) {
      setSel(ALL);
    }
  }, [loading, categories, sel]);

  const shown = useMemo(
    () => (sel === ALL ? products : products.filter((p) => loaiKey(p) === sel)),
    [products, sel]
  );

  if (loading) return <Loading />;
  if (error) return <ErrorBlock error={error} />;
  if (!products.length) return <EmptyBlock />;

  return (
    <div>
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSel(c.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                sel === c.key
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-ink border-line hover:border-brand"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProductCard key={p.ma} p={p} />
        ))}
      </div>
    </div>
  );
}
