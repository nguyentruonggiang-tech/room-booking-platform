export type BinhLuanViewModel = {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  tenNguoiBinhLuan?: string;
  avatar?: string;
};

export type CreateCommentPayload = Omit<BinhLuanViewModel, "id">;
