"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X, ImagePlus } from "lucide-react";
import { adminLocationService } from "../services/admin-location.service";
import { locationSchema, type LocationValues } from "../schemas/location-form.schema";
import type { AdminLocation } from "../types/admin-location.type";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editTarget: AdminLocation | null;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary";

export default function LocationModal({ open, onClose, editTarget, onSuccess }: Props) {
  const isEdit = editTarget !== null;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LocationValues>({
    resolver: zodResolver(locationSchema),
  });

  useEffect(() => {
    if (!open) return;
    setImageFile(null);
    if (editTarget) {
      reset({ tenViTri: editTarget.tenViTri, tinhThanh: editTarget.tinhThanh, quocGia: editTarget.quocGia });
      setPreview(editTarget.hinhAnh || "");
    } else {
      reset({ tenViTri: "", tinhThanh: "", quocGia: "" });
      setPreview("");
    }
  }, [open, editTarget]);

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(values: LocationValues) {
    try {
      const body = { ...values, hinhAnh: editTarget?.hinhAnh ?? "" };
      const saved = isEdit
        ? await adminLocationService.update(editTarget.id, body)
        : await adminLocationService.create(body);

      if (imageFile) {
        await adminLocationService.uploadImage(saved.id, imageFile);
      }

      toast.success(isEdit ? "Cập nhật vị trí thành công" : "Thêm vị trí thành công");
      onSuccess();
      onClose();
    } catch {
      toast.error(isEdit ? "Cập nhật thất bại" : "Thêm thất bại");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            {isEdit ? "Chỉnh sửa vị trí" : "Thêm vị trí"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tên vị trí</label>
            <input {...register("tenViTri")} placeholder="Nhập tên vị trí" className={inputClass} />
            <FieldError message={errors.tenViTri?.message} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tỉnh / Thành</label>
              <input {...register("tinhThanh")} placeholder="Nhập tỉnh/thành" className={inputClass} />
              <FieldError message={errors.tinhThanh?.message} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Quốc gia</label>
              <input {...register("quocGia")} placeholder="Nhập quốc gia" className={inputClass} />
              <FieldError message={errors.quocGia?.message} />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Hình ảnh</label>
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mb-2 h-32 w-full rounded-xl object-cover"
              />
            )}
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-admin-primary hover:text-admin-primary">
              <ImagePlus className="h-4 w-4" />
              {imageFile || preview ? "Đổi ảnh khác" : "Chọn ảnh"}
              <input type="file" accept="image/*" className="hidden" onChange={pickFile} />
            </label>
          </div>

          <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-admin-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? "Đang lưu..." : isEdit ? "Lưu thay đổi" : "Thêm vị trí"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
