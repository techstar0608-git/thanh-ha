"use client";

import Link from "next/link";
import { useProducts } from "@/lib/products";
import ProductCard from "./ProductCard";
import { Loading } from "./StateBlocks";

export default function FeaturedProducts() {
  const { products, loading, error } = useProducts();

  if (loading) return <Loading />;
  if (error || !products.length) return null;

  const featured = products.filter((p) => p.noiBat);
  const shown = (featured.length ? featured : products).slice(0, 3);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProductCard key={p.ma} p={p} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/san-pham" className="btn btn-ghost">
          Xem tất cả sản phẩm →
        </Link>
      </div>
    </>
  );
}
