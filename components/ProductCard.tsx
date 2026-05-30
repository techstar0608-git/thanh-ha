import Link from "next/link";
import SmartImage from "./SmartImage";
import type { Product } from "@/lib/types";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/san-pham/chi-tiet?ma=${encodeURIComponent(p.ma)}`}
      className="group flex flex-col bg-white border border-line rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative aspect-square bg-brand-soft overflow-hidden">
        <SmartImage
          src={p.anhChinh}
          alt={p.ten}
          width={700}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {p.loai && (
          <span className="absolute top-3 left-3 bg-white/95 border border-line text-brand-dark text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {p.loai}
          </span>
        )}
        {p.noiBat && (
          <span className="absolute top-3 right-3 bg-accent text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            Nổi bật
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-ink text-[17px] leading-snug group-hover:text-brand transition-colors">
          {p.ten}
        </h3>
        {p.moTaNgan && (
          <p className="mt-2 text-sm text-muted line-clamp-2">{p.moTaNgan}</p>
        )}
        <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
          <span className="font-semibold text-brand">
            {p.gia ? p.gia : "Liên hệ"}
          </span>
          <span className="text-sm font-medium text-accent group-hover:translate-x-0.5 transition-transform">
            Xem chi tiết →
          </span>
        </div>
      </div>
    </Link>
  );
}
