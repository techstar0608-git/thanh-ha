import Link from "next/link";
import Image from "next/image";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import { site } from "@/lib/site";

const stats = [
  { num: "10+", lbl: "Năm kinh nghiệm" },
  { num: "50+", lbl: "Sản phẩm dinh dưỡng" },
  { num: "63", lbl: "Tỉnh thành phủ sóng" },
  { num: "100%", lbl: "Cam kết chất lượng" },
];

const values = [
  {
    icon: "🌱",
    title: "Dinh dưỡng cân đối",
    desc: "Công thức phối trộn khoa học, cung cấp đầy đủ đa – trung – vi lượng cho từng giai đoạn sinh trưởng.",
  },
  {
    icon: "🧪",
    title: "Chất lượng kiểm soát",
    desc: "Nguyên liệu chọn lọc, sản xuất theo quy trình tiêu chuẩn, hàm lượng ổn định theo công bố.",
  },
  {
    icon: "🌾",
    title: "Tăng năng suất bền vững",
    desc: "Cải tạo đất, tăng sức đề kháng cây trồng, nâng cao năng suất và chất lượng nông sản.",
  },
  {
    icon: "🤝",
    title: "Đồng hành nhà nông",
    desc: "Đội ngũ kỹ thuật tư vấn tận vườn, hỗ trợ quy trình canh tác cho từng loại cây trồng.",
  },
];

const process = [
  { num: "1", title: "Khảo sát & tư vấn", desc: "Đánh giá loại đất, cây trồng và mục tiêu canh tác." },
  { num: "2", title: "Đề xuất sản phẩm", desc: "Chọn dòng phân bón và liều lượng phù hợp từng giai đoạn." },
  { num: "3", title: "Hướng dẫn sử dụng", desc: "Kỹ thuật viên hướng dẫn cách bón đúng – đủ – hiệu quả." },
  { num: "4", title: "Theo dõi & đồng hành", desc: "Đồng hành suốt vụ, điều chỉnh phù hợp thực tế." },
];

const highlights = [
  {
    icon: "🌱",
    title: "Dinh dưỡng cân đối",
    desc: "Công thức chuẩn xác cho từng giai đoạn sinh trưởng và nuôi trái.",
  },
  {
    icon: "🧪",
    title: "Kiểm soát chất lượng",
    desc: "Nguyên liệu chọn lọc và sản xuất theo quy trình tiêu chuẩn.",
  },
  {
    icon: "🚜",
    title: "Tư vấn chuyên sâu",
    desc: "Đội ngũ kỹ thuật đồng hành giúp ứng dụng đúng kỹ thuật.",
  },
  {
    icon: "📈",
    title: "Tăng năng suất",
    desc: "Giải pháp giúp cây khỏe mạnh, thu hoạch đều và hiệu quả.",
  },
];

const tel = site.hotline.replace(/\s/g, "");

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-brand-light via-brand-soft to-[#fff7e8]">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-bright/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="container-x relative grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 bg-white/80 border border-line rounded-full px-4 py-1.5 text-sm font-medium text-brand-dark">
              🌿 {site.slogan}
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-extrabold leading-tight text-brand-darker">
              Dinh dưỡng cây trồng,<br />
              <span className="text-brand">nâng tầm mùa vụ Việt</span>
            </h1>
            <p className="mt-5 text-lg text-muted max-w-xl">{site.moTa}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/san-pham" className="btn btn-primary">
                Khám phá sản phẩm →
              </Link>
              <a href={`tel:${tel}`} className="btn btn-ghost">
                📞 {site.hotline}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-sm text-brand-dark">
              <span>✓ Đa dạng dòng sản phẩm</span>
              <span>✓ Hỗ trợ kỹ thuật tận nơi</span>
              <span>✓ Chất lượng đảm bảo</span>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <Image
                src={site.logo}
                alt={`${site.tenDayDu} logo`}
                width={420}
                height={330}
                priority
                className="w-64 md:w-80 h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-12 bg-white">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-3xl border border-line bg-brand-soft p-6 text-center shadow-sm">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl">
                {item.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-darker">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand text-white">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
          {stats.map((s) => (
            <div key={s.lbl} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold">{s.num}</div>
              <div className="mt-1 text-sm text-white/85">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DANH MỤC SẢN PHẨM (gom nhóm từ Excel) */}
      <section className="py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="Sản phẩm"
            title="Danh mục sản phẩm"
            sub="Các nhóm sản phẩm được tổng hợp tự động từ danh mục công ty — chọn nhóm để xem chi tiết."
          />
          <CategoryGrid />
        </div>
      </section>

      {/* VỀ CHÚNG TÔI */}
      <section id="ve-chung-toi" className="py-20 bg-brand-soft">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">
              Về chúng tôi
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-brand-darker">
              {site.tenDayDu} — đồng hành cùng nhà nông Việt
            </h2>
            <p className="mt-4 text-muted">
              {site.ten} chuyên cung cấp phân bón và giải pháp dinh dưỡng cây
              trồng, hướng tới một nền nông nghiệp năng suất cao, an toàn và bền
              vững. Mỗi sản phẩm là kết quả của quá trình nghiên cứu, kiểm soát
              chất lượng nghiêm ngặt và thấu hiểu nhu cầu thực tế của bà con.
            </p>
            <p className="mt-3 text-muted">
              Với phương châm <b className="text-brand-dark">“{site.slogan}”</b>,
              chúng tôi không chỉ bán sản phẩm mà còn đồng hành cùng nhà nông
              bằng kỹ thuật canh tác và sự tận tâm.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              {values.slice(0, 2).map((v) => (
                <div key={v.title} className="bg-white rounded-xl border border-line p-4">
                  <div className="text-2xl">{v.icon}</div>
                  <div className="mt-2 font-bold text-ink">{v.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 bg-white rounded-2xl border border-line p-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-2xl">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-bold text-ink">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SẢN PHẨM NỔI BẬT */}
      <section className="py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="Tiêu biểu"
            title="Sản phẩm nổi bật"
            sub="Những dòng sản phẩm được nhà nông tin dùng."
          />
          <FeaturedProducts />
        </div>
      </section>

      {/* QUY TRÌNH */}
      <section className="py-20 bg-brand-soft">
        <div className="container-x">
          <SectionHead
            eyebrow="Cách chúng tôi làm việc"
            title="Quy trình đồng hành"
            sub="Từ khảo sát đến thu hoạch — chúng tôi luôn bên cạnh nhà nông."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s) => (
              <div key={s.num} className="relative bg-white rounded-2xl border border-line p-6 pt-8 text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-bold">
                  {s.num}
                </div>
                <h3 className="font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA LIÊN HỆ (không backend) */}
      <section className="py-20">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand to-brand-dark text-white px-8 py-14 text-center">
            <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative text-3xl font-extrabold">Cần tư vấn sản phẩm phù hợp?</h2>
            <p className="relative mt-3 text-white/85 max-w-xl mx-auto">
              Để lại nhu cầu — đội ngũ kỹ thuật của {site.ten} sẽ liên hệ tư vấn
              giải pháp dinh dưỡng tối ưu cho vườn của bạn.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3 justify-center">
              <a href={`tel:${tel}`} className="btn bg-white text-brand-dark hover:bg-white/90">
                📞 Gọi {site.hotline}
              </a>
              {site.zalo && (
                <a href={site.zalo} target="_blank" rel="noopener" className="btn btn-accent">
                  💬 Chat Zalo
                </a>
              )}
              <a href={`mailto:${site.email}`} className="btn bg-brand-darker text-white hover:bg-black/30">
                ✉️ {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <span className="text-sm font-semibold text-accent uppercase tracking-wide">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-extrabold text-brand-darker">{title}</h2>
      <p className="mt-3 text-muted">{sub}</p>
    </div>
  );
}
