import type { Metadata } from "next";
import ProductsGrid from "@/components/ProductsGrid";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Danh sách sản phẩm phân bón & dinh dưỡng cây trồng.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ loai?: string }>;
}) {
  const { loai } = await searchParams;

  return (
    <>
      <section className="bg-gradient-to-br from-brand-light to-brand-soft border-b border-line">
        <div className="container-x py-14 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-darker">
            Sản phẩm
          </h1>
          <p className="mt-3 text-muted max-w-2xl mx-auto">
            Các dòng phân bón và giải pháp dinh dưỡng cây trồng. Chọn nhóm bên
            dưới để lọc theo nhu cầu.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-x">
          <ProductsGrid initialLoai={loai} />
        </div>
      </section>
    </>
  );
}
