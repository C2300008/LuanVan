import mongoose from "mongoose";

const thongBaoSchema = new mongoose.Schema(
  {
    nv_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nhanVien",
    },
    tb_TieuDe: {
      type: String,
      required: [true, "Tiêu đề thông báo không được để trống."],
      trim: true,
      minLength: [5, "Tiêu đề phải ít nhất 5 ký tự."],
      maxLength: [100, "Tiêu đề không được vượt quá 100 ký tự."],
    },
    tb_NoiDung: {
      type: String,
      required: [true, "Nội dung thông báo không được để trống."],
      trim: true,
      minLength: [10, "Nội dung phải ít nhất 10 ký tự."],
      maxLength: [2000, "Nội dung không được vượt quá 2000 ký tự."],
    },
    tb_LoaiThongBao: {
      type: String,
      enum: ["Thông tin", "Cảnh báo", "Khẩn cấp"],
      default: "Thông tin",
    },
  },
  {
    timestamps: { createdAt: "tb_NgayTao", updatedAt: "tb_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo và thêm tiền tố "TB_" phía trước "_id" khóa chính.
thongBaoSchema.virtual("tb_ID").get(function () {
  return `TB_${this._id}`;
});

const thongBao = mongoose.model("thongBao", thongBaoSchema);
export default thongBao;
