import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="lien-he" className="bg-brand-darker text-white/90 mt-auto">
      <div className="container-x py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <div className="bg-white rounded-2xl inline-flex p-3 mb-4">
            <Image
              src={site.logo}
              alt={`${site.tenDayDu} logo`}
              width={140}
              height={110}
              className="h-14 w-auto"
            />
          </div>
          <p className="text-sm text-white/80 max-w-sm">{site.moTa}</p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Liên kết</h4>
          <ul className="space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-brand-bright transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Liên hệ</h4>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>{site.diaChi}</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href={`tel:${site.hotline.replace(/\s/g, "")}`} className="hover:text-brand-bright">
                {site.hotline}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a href={`mailto:${site.email}`} className="hover:text-brand-bright">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-x py-5 text-center text-xs text-white/70">
          © {new Date().getFullYear()} {site.tenDayDu}. {site.slogan}.
        </div>
      </div>
    </footer>
  );
}
