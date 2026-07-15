import mongoose from "mongoose";

const chiTietThongBaoSchema = new mongoose.Schema(
  {
    tk_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "taiKhoan",
      required: [true, "Mã tài khoản không được để trống"],
    },
    tb_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "thongBao",
      required: [true, "Mã thông báo không được để trống"],
    },
    cttb_TrangThai: {
      type: String,
      enum: ["Đã đọc", "Chưa đọc"],
      default: "Chưa đọc",
    },
    cttb_NgayDoc: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "cttb_NgayTao", updatedAt: "cttb_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "cttb_ID" và tiền tố "CTTB_" phía trước "_id" khóa chính.
chiTietThongBaoSchema.virtual("cttb_ID").get(function () {
  return `CTTB_${this._id}`;
});

const chiTietThongBao = mongoose.model(
  "chiTietThongBao",
  chiTietThongBaoSchema,
);

export default chiTietThongBao;
