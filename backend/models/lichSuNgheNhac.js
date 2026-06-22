import mongoose from "mongoose";

/**
 * @typedef {Object} lichSuNgheNhacSchema
 * @property {String} lsnn_ID - Khóa chính, mã lịch sử nghe nhạc.
 * @property {mongoose.Schema.Types.ObjectId} bn_ID - Khóa ngoại, mã bài nhạc.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID - Khóa ngoại, mã người dùng.
 * @property {Date} lsnn_NgayNghe - Ngày nghe (không được để trống, mặc định là ngày hiện tại).
 * @property {Number} lsnn_ThoiLuongNghe - Thời lượng nghe (không được để trống, số nguyên dương và phải lớn hơn hoặc bằng 0).
 * @property {Number} lsnn_TienTrinhNgheNhac - Tiến trình nghe nhạc (số nguyên dương, phải lớn hơn hoặc bằng 0 và không được vượt quá 100).
 * @property {Date} lsnn_NgayTao - thời điểm dữ liệu được khởi tạo.
 * @property {Date} lsnn_NgayCapNhat - thời điểm dữ liệu được cập nhật.
 */
const lichSuNgheNhacSchema = new mongoose.Schema(
  {
    bn_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "baiNhac",
      required: [true, "Mã bài nhạc không được để trống"],
    },
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống"],
    },
    lsnn_NgayNghe: {
      type: Date,
      required: [true, "Ngày nghe không được để trống"],
      default: Date.now,
    },
    lsnn_ThoiLuongNghe: {
      type: Number,
      required: [true, "Thời lượng nghe không được để trống"],
      min: [0, "Thời lượng nghe phải lớn hơn hoặc bằng 0"],
      validate: {
        validator: Number.isInteger,
        message: "Thời lượng nghe phải là một số nguyên",
      },
    },
    lsnn_TienTrinhNgheNhac: {
      type: Number,
      min: [0, "Tiến trình nghe nhạc phải lớn hơn hoặc bằng 0"],
      max: [100, "Tiến trình nghe nhạc không được vượt quá 100"],
      validate: {
        validator: Number.isInteger,
        message: "Tiến trình nghe nhạc phải là một số nguyên",
      },
    },
  },
  {
    timestamps: { createdAt: "lsnn_NgayTao", updatedAt: "lsnn_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "lsnn_ID" và tiền tố "LSNN_" phía trước "_id" khóa chính.
lichSuNgheNhacSchema.virtual("lsnn_ID").get(function () {
  return `LSNN_${this._id}`;
});

const lichSuNgheNhac = mongoose.model("lichSuNgheNhac", lichSuNgheNhacSchema);
export default lichSuNgheNhac;
