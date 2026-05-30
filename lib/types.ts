export type ThanhPhan = {
  ten: string;
  hamLuong: string;
};

export type Product = {
  /** Mã/slug dùng cho URL, ví dụ: npk-30-10-10 */
  ma: string;
  ten: string;
  loai: string;
  /** Mã nhóm để gom sản phẩm cùng danh mục (không hiển thị, chỉ dùng để nhóm/lọc) */
  maLoai: string;
  moTaNgan: string;
  moTaDai: string;
  /** Bảng thành phần dinh dưỡng */
  thanhPhan: ThanhPhan[];
  /** Danh sách công dụng */
  congDung: string[];
  doiTuong: string;
  cachDung: string;
  quyCach: string;
  xuatXu: string;
  gia: string;
  /** Link Drive gốc của ảnh chính */
  anhChinh: string;
  /** Các link Drive ảnh phụ */
  anhPhu: string[];
  noiBat: boolean;
};
