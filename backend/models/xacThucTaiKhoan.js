import mongoose from "mongoose";
/**
 * @typedef {Object} xacThucTaiKhoanSchema
 * @property {String} xttk_ID - Khóa chính, mã xác thực tài khoản.
 * @property {mongoose.Types.ObjectId} tk_ID - Khóa ngoại, mã tài khoản liên kết.
 * @property {String} xttk_MaXacThuc - Mã xác thực được tạo ra để xác minh tài khoản (ví dụ: mã OTP).
 * @property {Date} xttk_ThoiGianHetHan - Thời điểm mã xác thực hết hạn và không còn hiệu lực.
 * @property {String} xttk_TrangThai - Trạng thái của mã xác thực (ví dụ: "Đang chờ", "Đã xác thực", "Hết hạn").
 * @property {Date} xttk_NgayTao - Thời điểm mã xác thực được tạo.
 * @property {Date} xttk_NgayCapNhat - Thời điểm mã xác thực được cập nhật lần cuối.
 */

const xacThucTaiKhoanSchema = new mongoose.Schema(
  {
    tk_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "taiKhoan",
      required: [true, "Mã tài khoản không được để trống"],
    },
    xttk_MaXacThuc: {
      type: String,
      required: [true, "Mã xác thực không được để trống"],
      trim: true,
      minLength: [6, "Mã xác thực phải ít nhất 6 ký tự."],
      maxLength: [20, "Mã xác thực không được vượt quá 20 ký tự."],
    },
    xttk_ThoiGianHetHan: {
      type: Date,
      required: [true, "Thời gian hết hạn không được để trống"],
    },
    xttk_TrangThai: {
      type: String,
      enum: ["Đang chờ", "Đã xác thực", "Hết hạn"],
      default: "Đang chờ",
    },
  },
  {
    timestamps: { createdAt: "xttk_NgayTao", updatedAt: "xttk_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "xttk_ID" và tiền tố "XTTK_" phía trước "_id" khóa chính.
xacThucTaiKhoanSchema.virtual("xttk_ID").get(function () {
  return `XTTK_${this._id}`;
});

const xacThucTaiKhoan = mongoose.model(
  "xacThucTaiKhoan",
  xacThucTaiKhoanSchema,
);

export default xacThucTaiKhoan;
