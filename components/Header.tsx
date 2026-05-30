"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-line">
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src={site.logo}
            alt={`${site.tenDayDu} logo`}
            width={120}
            height={94}
            priority
            className="h-11 md:h-14 w-auto"
          />
          <span className="hidden sm:block leading-tight">
            <span className="block font-extrabold text-brand-dark text-lg">
              {site.ten}
            </span>
            <span className="block text-[11px] text-accent font-semibold">
              {site.slogan}
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink hover:text-brand transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#lien-he" className="btn btn-primary">
            Liên hệ tư vấn
          </Link>
        </nav>

        <button
          aria-label="Mở menu"
          className="md:hidden p-2 text-brand-dark"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-white">
          <div className="container-x py-3 flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[15px] font-medium text-ink hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#lien-he"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2 justify-center"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
