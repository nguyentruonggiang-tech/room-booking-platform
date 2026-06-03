"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X, ImagePlus } from "lucide-react";
import { adminRoomService } from "../services/admin-room.service";
import { adminLocationService } from "@/features/admin/locations/services/admin-location.service";
import { roomSchema, type RoomValues } from "../schemas/room-form.schema";
import type { AdminRoom } from "../types/admin-room.type";
import type { AdminLocation } from "@/features/admin/locations/types/admin-location.type";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editTarget: AdminRoom | null;
};

const AMENITIES: { key: keyof RoomValues; label: string }[] = [
  { key: "mayGiat", label: "Máy giặt" },
  { key: "banLa", label: "Bàn là" },
  { key: "tivi", label: "TV" },
  { key: "dieuHoa", label: "Điều hòa" },
  { key: "wifi", label: "Wifi" },
  { key: "bep", label: "Bếp" },
  { key: "doXe", label: "Đỗ xe" },
  { key: "hoBoi", label: "Hồ bơi" },
  { key: "banUi", label: "Bàn ủi" },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary";

const numOpts = { valueAsNumber: true } as const;

export default function RoomModal({ open, onClose, editTarget, onSuccess }: Props) {
  const isEdit = editTarget !== null;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [locations, setLocations] = useState<AdminLocation[]>([]);

  useEffect(() => {
    adminLocationService.getAll().then(setLocations).catch(() => {});
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RoomValues>({
    resolver: zodResolver(roomSchema),
  });

  useEffect(() => {
    if (!open) return;
    setImageFile(null);
    if (editTarget) {
      const { id: _id, hinhAnh: _img, ...rest } = editTarget;
      reset(rest);
      setPreview(editTarget.hinhAnh || "");
    } else {
      reset({
        tenPhong: "", moTa: "", khach: 1, phongNgu: 1, giuong: 1,
        phongTam: 1, giaTien: 0, maViTri: 0,
        mayGiat: false, banLa: false, tivi: false, dieuHoa: false,
        wifi: false, bep: false, doXe: false, hoBoi: false, banUi: false,
      });
      setPreview("");
    }
  }, [open, editTarget]);

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(values: RoomValues) {
    try {
      const body = { ...values, hinhAnh: editTarget?.hinhAnh ?? "" };
      const saved = isEdit
        ? await adminRoomService.update(editTarget.id, body)
        : await adminRoomService.create(body);

      if (imageFile) await adminRoomService.uploadImage(saved.id, imageFile);

      toast.success(isEdit ? "Cập nhật phòng thành công" : "Thêm phòng thành công");
      onSuccess();
      onClose();
    } catch {
      toast.error(isEdit ? "Cập nhật thất bại" : "Thêm thất bại");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            {isEdit ? "Chỉnh sửa phòng" : "Thêm phòng"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-h-[75vh] space-y-4 overflow-y-auto px-6 py-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tên phòng</label>
            <input {...register("tenPhong")} placeholder="Nhập tên phòng" className={inputClass} />
            <FieldError message={errors.tenPhong?.message} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Số khách</label>
              <input {...register("khach", numOpts)} type="number" min={1} placeholder="Nhập số khách" className={inputClass} />
              <FieldError message={errors.khach?.message} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Giá / đêm (₫)</label>
              <input {...register("giaTien", numOpts)} type="number" min={1} placeholder="Nhập giá tiền" className={inputClass} />
              <FieldError message={errors.giaTien?.message} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Phòng ngủ</label>
              <input {...register("phongNgu", numOpts)} type="number" min={0} placeholder="0" className={inputClass} />
              <FieldError message={errors.phongNgu?.message} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Giường</label>
              <input {...register("giuong", numOpts)} type="number" min={0} placeholder="0" className={inputClass} />
              <FieldError message={errors.giuong?.message} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Phòng tắm</label>
              <input {...register("phongTam", numOpts)} type="number" min={0} placeholder="0" className={inputClass} />
              <FieldError message={errors.phongTam?.message} />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Vị trí</label>
            <select {...register("maViTri", numOpts)} className={inputClass}>
              <option value={0}>-- Chọn vị trí --</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.tenViTri} — {loc.tinhThanh}, {loc.quocGia}
                </option>
              ))}
            </select>
            <FieldError message={errors.maViTri?.message} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mô tả <span className="font-normal text-gray-400">(tùy chọn)</span>
            </label>
            <textarea {...register("moTa")} rows={3} placeholder="Mô tả ngắn về phòng..." className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Tiện ích</label>
            <div className="grid grid-cols-3 gap-2">
              {AMENITIES.map(({ key, label }) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                  <input {...register(key)} type="checkbox" className="accent-admin-primary" />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Hình ảnh</label>
            {preview && (
              <img src={preview} alt={editTarget?.tenPhong ?? "preview"} className="mb-2 h-32 w-full rounded-xl object-cover" />
            )}
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-admin-primary hover:text-admin-primary">
              <ImagePlus className="h-4 w-4" />
              {imageFile || preview ? "Đổi ảnh khác" : "Chọn ảnh"}
              <input type="file" accept="image/*" className="hidden" onChange={pickFile} />
            </label>
          </div>

          <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Hủy
            </button>
            <button type="submit" disabled={isSubmitting} className="rounded-xl bg-admin-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
              {isSubmitting ? "Đang lưu..." : isEdit ? "Lưu thay đổi" : "Thêm phòng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
