export type CommentItem = {
  id: number;
  maNguoiBinhLuan: number;
  tenNguoiBinhLuan: string;
  anhDaiDien?: string;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
};

export const MOCK_COMMENTS: CommentItem[] = [
  { id: 1, maNguoiBinhLuan: 1, tenNguoiBinhLuan: "Nguyễn Văn An", ngayBinhLuan: "2024-11-10", noiDung: "Phòng rất sạch sẽ và thoáng mát. Chủ nhà nhiệt tình, hỗ trợ nhanh. Vị trí thuận tiện, gần biển và các nhà hàng ngon. Sẽ quay lại lần sau!", saoBinhLuan: 5 },
  { id: 2, maNguoiBinhLuan: 2, tenNguoiBinhLuan: "Trần Thị Bình", ngayBinhLuan: "2024-10-22", noiDung: "Căn hộ đẹp, đầy đủ tiện nghi. View nhìn ra biển rất tuyệt. Tuy nhiên wifi hơi chậm vào buổi tối.", saoBinhLuan: 4 },
  { id: 3, maNguoiBinhLuan: 3, tenNguoiBinhLuan: "Lê Minh Cường", ngayBinhLuan: "2024-10-05", noiDung: "Trải nghiệm tuyệt vời! Phòng rộng rãi, sạch sẽ. Chủ nhà check-in rất nhanh và hỗ trợ chu đáo.", saoBinhLuan: 5 },
  { id: 4, maNguoiBinhLuan: 4, tenNguoiBinhLuan: "Phạm Thu Dung", ngayBinhLuan: "2024-09-18", noiDung: "Phòng ổn, giá hợp lý. Có đầy đủ đồ dùng cần thiết. Điều hòa mát, giường êm. Chỉ có điều bãi đậu xe hơi xa.", saoBinhLuan: 4 },
  { id: 5, maNguoiBinhLuan: 5, tenNguoiBinhLuan: "Hoàng Văn Em", ngayBinhLuan: "2024-09-01", noiDung: "Rất hài lòng với chuyến đi. Căn hộ y như ảnh, không gian yên tĩnh. Sẽ giới thiệu cho bạn bè.", saoBinhLuan: 5 },
  { id: 6, maNguoiBinhLuan: 6, tenNguoiBinhLuan: "Vũ Thị Phương", ngayBinhLuan: "2024-08-14", noiDung: "Phòng sạch, tiện nghi đầy đủ. Nhân viên hỗ trợ 24/7. Vị trí đẹp gần trung tâm.", saoBinhLuan: 4 },
  { id: 7, maNguoiBinhLuan: 7, tenNguoiBinhLuan: "Đặng Quốc Giang", ngayBinhLuan: "2024-07-29", noiDung: "Không gian thoáng đãng, ánh sáng tự nhiên tốt. Bếp đầy đủ dụng cụ nấu ăn. Sẽ quay lại!", saoBinhLuan: 5 },
  { id: 8, maNguoiBinhLuan: 8, tenNguoiBinhLuan: "Bùi Thanh Hải", ngayBinhLuan: "2024-07-10", noiDung: "Căn hộ rất đẹp và hiện đại. Tuy nhiên cầu thang hơi dốc khi mang hành lý nặng. Tổng thể rất ổn.", saoBinhLuan: 4 },
];
