import mongoose from "mongoose";
/**
 * @typedef {Object} vaiTroSchema
 * @property {String} vt_ID - Khóa chính, mã vai trò.
 * @property {String} vt_TenVaiTro - Tên của vai trò (ví dụ: "Quản trị viên", "Nhân viên", "Khách hàng").
 * @property {String} vt_TrangThai - Trạng thái của vai trò (ví dụ: "Kích hoạt", "Vô hiệu hóa").
 * @property {String} vt_MoTa - Mô tả chi tiết về vai trò và quyền hạn của nó.
 * @property {Date} vt_NgayTao - Thời điểm vai trò được tạo.
 * @property {Date} vt_NgayCapNhat - Thời điểm vai trò được cập nhật lần cuối.
 */
const vaiTroSchema = new mongoose.Schema(
  {
    vt_TenVaiTro: {
      type: String,
      required: [true, "Tên vai trò không được để trống."],
      trim: true,
      minLength: [3, "Tên vai trò phải ít nhất 3 ký tự."],
      maxLength: [50, "Tên vai trò không được vượt quá 50 ký tự."],
    },
    vt_TrangThai: {
      type: String,
      enum: ["Kích hoạt", "Vô hiệu hóa"],
      default: "Kích hoạt",
    },
    vt_MoTa: {
      type: String,
      required: [true, "Mô tả vai trò không được để trống."],
      trim: true,
      maxLength: [500, "Mô tả không được vượt quá 500 ký tự."],
    },
  },
  {
    timestamps: { createdAt: "vt_NgayTao", updatedAt: "vt_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
// Tạo trường ảo và thêm tiền tố "VT_" phía trước "_id" khóa chính.
vaiTroSchema.virtual("vt_ID").get(function () {
  return `VT_${this._id}`;
});

const vaiTro = mongoose.model("vaiTro", vaiTroSchema);
export default vaiTro;
