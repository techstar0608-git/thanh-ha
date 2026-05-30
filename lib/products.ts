"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import type { Product, ThanhPhan } from "./types";

/** Đường dẫn tới file Excel khách điền (đặt trong /public/data). */
export const EXCEL_PATH = "/data/san-pham.xlsx";

// --- Tiện ích chuẩn hoá tên cột (bỏ dấu, viết thường, bỏ ký tự lạ) ---
function normalize(s: unknown): string {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

// Bí danh tên cột -> trường dữ liệu chuẩn
const COLUMN_ALIASES: Record<string, keyof RawRow> = {
  masanpham: "ma", ma: "ma", masp: "ma", id: "ma",
  tensanpham: "ten", ten: "ten", tensp: "ten",
  loai: "loai", loaisanpham: "loai", danhmuc: "loai", nhom: "loai",
  maloai: "maLoai", maloaisanpham: "maLoai", madanhmuc: "maLoai",
  manhom: "maLoai", maloaisp: "maLoai", madm: "maLoai",
  motangan: "moTaNgan", tieude: "moTaNgan", slogan: "moTaNgan",
  motachitiet: "moTaDai", motadai: "moTaDai", mota: "moTaDai",
  thanhphan: "thanhPhan", thanhphandinhduong: "thanhPhan",
  congdung: "congDung", loiich: "congDung", uudiem: "congDung",
  doituong: "doiTuong", doituongcaytrong: "doiTuong", caytrong: "doiTuong",
  cachdung: "cachDung", cachdunglieuluong: "cachDung", lieuluong: "cachDung",
  huongdansudung: "cachDung",
  quycach: "quyCach", quycachdonggoi: "quyCach", donggoi: "quyCach",
  xuatxu: "xuatXu", nguongoc: "xuatXu",
  gia: "gia", giaban: "gia",
  anhchinh: "anhChinh", anhdaidien: "anhChinh", hinhchinh: "anhChinh",
  anhchinhlinkdrive: "anhChinh",
  anhphu: "anhPhu", thuvienanh: "anhPhu", anhgallery: "anhPhu",
  anhphulinkdrive: "anhPhu",
  noibat: "noiBat", noibattrangchu: "noiBat", hot: "noiBat",
};

type RawRow = {
  ma?: string; ten?: string; loai?: string; maLoai?: string;
  moTaNgan?: string; moTaDai?: string; thanhPhan?: string;
  congDung?: string; doiTuong?: string; cachDung?: string;
  quyCach?: string; xuatXu?: string; gia?: string;
  anhChinh?: string; anhPhu?: string; noiBat?: string;
};

function splitList(s?: string): string[] {
  return String(s ?? "")
    .split(/[\n;]+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseThanhPhan(s?: string): ThanhPhan[] {
  return splitList(s).map((entry) => {
    const m = entry.split(/\s*[=:]\s*/);
    if (m.length >= 2) {
      return { ten: m[0].trim(), hamLuong: m.slice(1).join(": ").trim() };
    }
    return { ten: entry, hamLuong: "" };
  });
}

function isTruthy(s?: string): boolean {
  const v = normalize(s);
  return ["co", "x", "yes", "y", "1", "true", "on"].includes(v);
}

function slugify(s: string): string {
  return normalize(s).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * Khóa gom nhóm danh mục: ưu tiên "Mã loại", nếu trống thì fallback tên "Loại".
 * Dùng cho cả nhóm danh mục lẫn lọc — KHÔNG hiển thị trực tiếp cho người dùng.
 */
export function loaiKey(p: Pick<Product, "maLoai" | "loai">): string {
  return slugify(p.maLoai) || slugify(p.loai) || "khac";
}

function rowToProduct(raw: RawRow): Product | null {
  const ten = (raw.ten ?? "").trim();
  const ma = (raw.ma ?? "").trim() || slugify(ten);
  if (!ten && !ma) return null;
  return {
    ma: slugify(ma),
    ten: ten || ma,
    loai: (raw.loai ?? "").trim(),
    maLoai: (raw.maLoai ?? "").trim(),
    moTaNgan: (raw.moTaNgan ?? "").trim(),
    moTaDai: (raw.moTaDai ?? "").trim(),
    thanhPhan: parseThanhPhan(raw.thanhPhan),
    congDung: splitList(raw.congDung),
    doiTuong: (raw.doiTuong ?? "").trim(),
    cachDung: (raw.cachDung ?? "").trim(),
    quyCach: (raw.quyCach ?? "").trim(),
    xuatXu: (raw.xuatXu ?? "").trim(),
    gia: (raw.gia ?? "").trim(),
    anhChinh: (raw.anhChinh ?? "").trim(),
    anhPhu: splitList(raw.anhPhu),
    noiBat: isTruthy(raw.noiBat),
  };
}

/** Chọn sheet chứa dữ liệu sản phẩm (bỏ qua sheet Hướng dẫn). */
function pickSheet(wb: XLSX.WorkBook): XLSX.WorkSheet | null {
  const names = wb.SheetNames;
  const byName = names.find((n) => normalize(n) === "sanpham");
  if (byName) return wb.Sheets[byName];
  const notGuide = names.find((n) => normalize(n) !== "huongdan");
  return notGuide ? wb.Sheets[notGuide] : wb.Sheets[names[0]] ?? null;
}

export function parseWorkbook(data: ArrayBuffer): Product[] {
  const wb = XLSX.read(data, { type: "array" });
  const ws = pickSheet(wb);
  if (!ws) return [];

  const matrix = XLSX.utils.sheet_to_json<unknown[]>(ws, {
    header: 1,
    blankrows: false,
    defval: "",
  });
  if (!matrix.length) return [];

  // Tìm dòng tiêu đề (dòng đầu tiên có cột "Mã" hoặc "Tên sản phẩm")
  let headerIdx = matrix.findIndex((row) =>
    (row as unknown[]).some((c) => {
      const k = normalize(c);
      return k === "masanpham" || k === "tensanpham" || k === "ten" || k === "ma";
    })
  );
  if (headerIdx < 0) headerIdx = 0;

  const headers = (matrix[headerIdx] as unknown[]).map((c) => {
    const key = normalize(c);
    return COLUMN_ALIASES[key] ?? null;
  });

  const products: Product[] = [];
  for (let r = headerIdx + 1; r < matrix.length; r++) {
    const row = matrix[r] as unknown[];
    const raw: RawRow = {};
    headers.forEach((field, i) => {
      if (field) raw[field] = String(row[i] ?? "");
    });
    const p = rowToProduct(raw);
    if (p) products.push(p);
  }
  return products;
}

/** Tải + đọc file Excel ở phía trình duyệt (không cần build lại khi đổi file). */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${EXCEL_PATH}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Không tải được ${EXCEL_PATH} (HTTP ${res.status})`);
  const buf = await res.arrayBuffer();
  return parseWorkbook(buf);
}

type State = { products: Product[]; loading: boolean; error: string | null };

/** Hook React: trả về danh sách sản phẩm đọc từ Excel. */
export function useProducts(): State {
  const [state, setState] = useState<State>({
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let alive = true;
    fetchProducts()
      .then((products) => alive && setState({ products, loading: false, error: null }))
      .catch((e) =>
        alive &&
        setState({ products: [], loading: false, error: String(e?.message ?? e) })
      );
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
