import mongoose from "mongoose";

/**
 * @typedef {Object} chiTietThongBaoSchema
 * @property {String} cttb_ID - Khóa chính, mã chi tiết thông báo.
 * @property {mongoose.Schema.Types.ObjectId} tk_ID - Khóa ngoại, mã tài khoản nhận thông báo.
 * @property {mongoose.Schema.Types.ObjectId} tb_ID - Khóa ngoại, mã thông báo.
 * @property {String} cttb_TrangThai - Trạng thái của chi tiết thông báo (ví dụ: "Đã đọc", "Chưa đọc").
 * @property {Date} cttb_NgayDoc - Thời điểm chi tiết thông báo được đọc (nếu đã đọc).
 * @property {Date} cttb_NgayTao - Thời điểm chi tiết thông báo được tạo.
 * @property {Date} cttb_NgayCapNhat - Thời điểm chi tiết thông báo được cập nhật lần cuối.
 */
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
