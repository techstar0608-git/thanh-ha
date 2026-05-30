// Chuyển link chia sẻ Google Drive (public) -> link ảnh hiển thị trực tiếp.
//
// Hỗ trợ các dạng link mà khách thường dán:
//   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   https://drive.google.com/open?id=FILE_ID
//   https://drive.google.com/uc?id=FILE_ID&export=view
//   https://docs.google.com/.../d/FILE_ID/...
//   FILE_ID (dán thẳng mã)
// Nếu là link ảnh trực tiếp (http...jpg/png/...) thì giữ nguyên.

export function extractDriveId(input: string): string | null {
  const s = (input || "").trim();
  if (!s) return null;

  const byPath = s.match(/\/d\/([a-zA-Z0-9_-]{15,})/);
  if (byPath) return byPath[1];

  const byQuery = s.match(/[?&]id=([a-zA-Z0-9_-]{15,})/);
  if (byQuery) return byQuery[1];

  // Dán thẳng mã file (không phải URL)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(s)) return s;

  return null;
}

/** Link ảnh chính (qua lh3 — ổn định để nhúng vào <img>). */
export function driveImageUrl(input: string, width = 1600): string {
  const s = (input || "").trim();
  if (!s) return "";
  const id = extractDriveId(s);
  if (id) return `https://lh3.googleusercontent.com/d/${id}=w${width}`;
  return s; // coi như link ảnh trực tiếp
}

/** Link dự phòng (thumbnail) — dùng khi link chính lỗi. */
export function driveImageFallback(input: string, width = 1600): string {
  const s = (input || "").trim();
  if (!s) return "";
  const id = extractDriveId(s);
  if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
  return s;
}
