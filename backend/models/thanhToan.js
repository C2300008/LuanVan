import mongoose from "mongoose";

/**
 * @typedef {Object} thanhToanSchema
 * @property {String} tt_ID - Khóa chính, mã thanh toán.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID - Khóa ngoại, mã người dùng.
 * @property {mongoose.Schema.Types.ObjectId} uh_ID - Khóa ngoại, mã ủng hộ.
 * @property {Number} tt_SoTienThanhToan - Số tiền thanh toán (không được để trống, số nguyên dương và phải lớn hơn hoặc bằng 0).
 * @property {String} tt_MaGiaoDich - Mã giao dịch (không được để trống, phải là duy nhất).
 * @property {Date} TT_NgayThanhToan - Ngày thanh toán (không được để trống, mặc định là ngày hiện tại).
 * @property {String} TT_TrangThai - Trạng thái thanh toán (có thể là "Đang xử lý", "Thành công", hoặc "Thất bại", mặc định là "Đang xử lý").
 * @property {Date} tt_NgayTao - thời điểm dữ liệu được khởi tạo.
 * @property {Date} tt_NgayCapNhat - thời điểm dữ liệu được cập nhật.
 */
const thanhToanSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống"],
    },
    uh_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ungHo",
      required: [true, "Mã ủng hộ không được để trống"],
    },
    tt_SoTienThanhToan: {
      type: Number,
      required: [true, "Số tiền thanh toán không được để trống"],
      min: [0, "Số tiền thanh toán phải lớn hơn hoặc bằng 0"],
      validate: {
        validator: Number.isInteger,
        message: "Số tiền thanh toán phải là một số nguyên",
      },
    },
    tt_MaGiaoDich: {
      type: String,
      required: [true, "Mã giao dịch không được để trống"],
      unique: true,
    },
    TT_NgayThanhToan: {
      type: Date,
      required: [true, "Ngày thanh toán không được để trống"],
      default: Date.now,
    },
    TT_TrangThai: {
      type: String,
      enum: ["Đang xử lý", "Thành công", "Thất bại"],
      default: "Đang xử lý",
    },
  },
  {
    timestamps: { createdAt: "tt_NgayTao", updatedAt: "tt_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "tt_ID" và tiền tố "TT_" phía trước "_id" khóa chính.
thanhToanSchema.virtual("tt_ID").get(function () {
  return `TT_${this._id}`;
});

const thanhToan = mongoose.model("thanhToan", thanhToanSchema);
export default thanhToan;
