"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { loaiKey, useProducts } from "@/lib/products";
import SmartImage from "@/components/SmartImage";
import ProductCard from "@/components/ProductCard";
import { Loading } from "@/components/StateBlocks";
import { site } from "@/lib/site";
import type { Product } from "@/lib/types";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug);
  const { products, loading, error } = useProducts();

  const product = useMemo(
    () => products.find((p) => p.ma === slug),
    [products, slug]
  );
  const related = useMemo(
    () =>
      product
        ? products
            .filter((p) => loaiKey(p) === loaiKey(product) && p.ma !== product.ma)
            .slice(0, 3)
        : [],
    [products, product]
  );

  if (loading) {
    return (
      <div className="container-x py-20">
        <Loading label="Đang tải sản phẩm…" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Không tìm thấy sản phẩm</h1>
        <p className="mt-2 text-muted">
          {error ? `Lỗi đọc dữ liệu: ${error}` : "Sản phẩm không tồn tại hoặc đã được đổi mã."}
        </p>
        <Link href="/san-pham" className="btn btn-primary mt-6">
          ← Về danh sách sản phẩm
        </Link>
      </div>
    );
  }

  return <Detail product={product} related={related} />;
}

const tel = site.hotline.replace(/\s/g, "");

function Detail({ product: p, related }: { product: Product; related: Product[] }) {
  const images = [p.anhChinh, ...p.anhPhu].filter(Boolean);
  const [active, setActive] = useState(0);
  const mainSrc = images[active] ?? p.anhChinh;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-brand-soft border-b border-line">
        <div className="container-x py-4 text-sm text-muted flex flex-wrap gap-1.5">
          <Link href="/" className="hover:text-brand">Trang chủ</Link> /
          <Link href="/san-pham" className="hover:text-brand">Sản phẩm</Link> /
          <span className="text-ink font-medium">{p.ten}</span>
        </div>
      </div>

      {/* Top */}
      <section className="py-12">
        <div className="container-x grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-brand-soft rounded-2xl border border-line overflow-hidden">
              <SmartImage
                src={mainSrc}
                alt={p.ten}
                width={1200}
                className="w-full h-full object-contain p-6"
              />
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`aspect-square rounded-xl border overflow-hidden bg-brand-soft ${
                      i === active ? "border-brand ring-2 ring-brand/30" : "border-line"
                    }`}
                  >
                    <SmartImage src={img} alt={`${p.ten} ${i + 1}`} width={300} className="w-full h-full object-contain p-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {p.loai && (
              <span className="inline-block bg-brand-light text-brand-dark text-xs font-semibold px-3 py-1 rounded-full">
                {p.loai}
              </span>
            )}
            <h1 className="mt-3 text-3xl font-extrabold text-brand-darker leading-tight">{p.ten}</h1>
            {p.moTaNgan && <p className="mt-3 text-lg text-muted">{p.moTaNgan}</p>}

            {p.gia && (
              <div className="mt-5 text-2xl font-extrabold text-accent">{p.gia}</div>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Nhóm sản phẩm", value: p.loai },
                { label: "Quy cách", value: p.quyCach },
                { label: "Xuất xứ", value: p.xuatXu },
                { label: "Giá tham khảo", value: p.gia || "Liên hệ" },
              ]
                .filter((item) => item.value)
                .map((item) => (
                  <div key={item.label} className="rounded-3xl border border-line bg-brand-soft p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-ink">{item.value}</div>
                  </div>
                ))}
            </div>

            {p.congDung.length > 0 && (
              <Block title="Lợi ích chính">
                <ul className="space-y-3">
                  {p.congDung.map((c, i) => (
                    <li key={i} className="flex gap-3 text-ink">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-light text-brand text-xs font-bold">
                        ✓
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {p.doiTuong && (
              <div className="mt-6 bg-brand-soft border border-line rounded-xl p-4">
                <div className="text-xs font-semibold text-accent uppercase">Đối tượng cây trồng</div>
                <div className="mt-1 text-ink">{p.doiTuong}</div>
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`tel:${tel}`} className="btn btn-primary">📞 Gọi đặt hàng / tư vấn</a>
              {site.zalo && (
                <a href={site.zalo} target="_blank" rel="noopener" className="btn btn-accent">💬 Chat Zalo</a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mô tả + Thành phần + Cách dùng */}
      <section className="pb-12">
        <div className="container-x grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {p.moTaDai && (
              <Block title="Mô tả sản phẩm">
                <p className="text-muted whitespace-pre-line">{p.moTaDai}</p>
              </Block>
            )}
            {p.cachDung && (
              <Block title="Cách dùng & liều lượng">
                <p className="text-muted whitespace-pre-line">{p.cachDung}</p>
              </Block>
            )}
          </div>

          <div className="space-y-8">
            {p.thanhPhan.length > 0 && (
              <Block title="Thành phần">
                <table className="w-full text-sm">
                  <tbody>
                    {p.thanhPhan.map((t, i) => (
                      <tr key={i} className="border-b border-line last:border-0">
                        <td className="py-2.5 pr-3 text-ink">{t.ten}</td>
                        <td className="py-2.5 text-right font-semibold text-brand-dark whitespace-nowrap">{t.hamLuong}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Block>
            )}
            {(p.quyCach || p.xuatXu) && (
              <Block title="Thông tin khác">
                <dl className="text-sm space-y-2">
                  {p.quyCach && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Quy cách</dt>
                      <dd className="text-ink font-medium text-right">{p.quyCach}</dd>
                    </div>
                  )}
                  {p.xuatXu && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">Xuất xứ</dt>
                      <dd className="text-ink font-medium text-right">{p.xuatXu}</dd>
                    </div>
                  )}
                </dl>
              </Block>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-14 bg-brand-soft">
          <div className="container-x">
            <h2 className="text-2xl font-extrabold text-brand-darker text-center mb-10">
              Sản phẩm cùng nhóm
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard key={r.ma} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-line rounded-2xl p-6">
      <h2 className="text-lg font-bold text-brand-darker mb-4">{title}</h2>
      {children}
    </div>
  );
}
