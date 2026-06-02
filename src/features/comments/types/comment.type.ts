export type BinhLuanViewModel = {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  // fields thực tế API trả về, không có trong swagger
  tenNguoiBinhLuan?: string;
  avatar?: string;
};

export type CreateCommentPayload = Omit<BinhLuanViewModel, "id">;
