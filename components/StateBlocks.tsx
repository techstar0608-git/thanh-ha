import { EXCEL_PATH } from "@/lib/products";

export function Loading({ label = "Đang tải sản phẩm…" }: { label?: string }) {
  return (
    <div className="py-16 text-center text-muted">
      <div className="inline-block w-8 h-8 border-4 border-brand-light border-t-brand rounded-full animate-spin" />
      <p className="mt-3 text-sm">{label}</p>
    </div>
  );
}

export function ErrorBlock({ error }: { error: string }) {
  return (
    <div className="py-12 px-6 text-center bg-brand-soft border border-line rounded-2xl">
      <p className="font-semibold text-ink">Chưa đọc được dữ liệu sản phẩm</p>
      <p className="mt-2 text-sm text-muted max-w-md mx-auto">
        Hãy chắc chắn file <code className="text-brand-dark">{EXCEL_PATH}</code> đã
        có và đúng định dạng template. Chi tiết: {error}
      </p>
    </div>
  );
}

export function EmptyBlock() {
  return (
    <div className="py-12 px-6 text-center bg-brand-soft border border-line rounded-2xl">
      <p className="font-semibold text-ink">Chưa có sản phẩm nào</p>
      <p className="mt-2 text-sm text-muted">
        Mở file <code className="text-brand-dark">{EXCEL_PATH}</code> và điền sản
        phẩm theo template, sau đó tải lại trang.
      </p>
    </div>
  );
}
