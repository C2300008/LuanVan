import mongoose from "mongoose";

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
