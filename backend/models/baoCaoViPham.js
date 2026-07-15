import mongoose from "mongoose";

const baoCaoViPhamSchema = new mongoose.Schema(
  {
    nv_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nhanVien",
    },
    nd_ID_BaoCao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng báo cáo không được để trống."],
    },
    nd_ID_BiBaoCao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng bị báo cáo không được để trống."],
    },
    bcvp_LoaiViPham: {
      type: String,
      required: [true, "Loại vi phạm không được để trống."],
    },
    bcvp_NoiDung: {
      type: String,
      required: [true, "Nội dung báo cáo không được để trống."],
      maxlength: [1000, "Nội dung báo cáo không được vượt quá 1000 ký tự."],
    },
    bcvp_TrangThai: {
      type: String,
      required: [true, "Trạng thái báo cáo không được để trống."],
      enum: ["Chờ xử lý", "Đang xử lý", "Đã xử lý"],
      default: "Chờ xử lý",
    },
    bcvp_NgayBaoCao: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "bcvp_NgayTao", updatedAt: "bcvp_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo bcvp_ID và thêm tiền tố "BCVP_" phía trước "_id" khóa chính.
baoCaoViPhamSchema.virtual("bcvp_ID").get(function () {
  return `BCVP_${this._id}`;
});

const baoCaoViPham = mongoose.model("baoCaoViPham", baoCaoViPhamSchema);
export default baoCaoViPham;
