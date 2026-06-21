import mongoose from "mongoose";

/**
 * @typedef {Object} thongBaoSchema
 * @property {String} tb_ID - Khóa chính, mã thông báo.
 * @property {mongoose.Types.ObjectId} nv_ID - Khóa ngoại, mã nhân viên tạo thông báo.
 * @property {String} tb_TieuDe - Tiêu đề của thông báo.
 * @property {String} tb_NoiDung - Nội dung chi tiết của thông báo.
 * @property {String} tb_LoaiThongBao - Loại thông báo ("Thông tin", "Cảnh báo", "Khẩn cấp").
 * @property {Date} tb_NgayTao - Thời điểm thông báo được tạo.
 * @property {Date} tb_NgayCapNhat - Thời điểm thông báo được cập nhật lần cuối.
 */
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
