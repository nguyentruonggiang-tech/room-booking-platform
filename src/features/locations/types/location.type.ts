export type ViTriViewModel = {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
};

export type PhanTrang<T> = {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords: string | null;
  data: T[];
};
