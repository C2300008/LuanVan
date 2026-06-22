import mongoose from "mongoose";

/**
 * @typedef {Object} chiTietDanhSachPhatSchema
 * @property {String} ctdsp_ID - Khóa chính, mã chi tiết danh sách phát.
 * @property {mongoose.Schema.Types.ObjectId} dsp_ID - Khóa ngoại, mã danh sách phát.
 * @property {mongoose.Schema.Types.ObjectId} bn_ID - Khóa ngoại, mã bài nhạc.
 * @property {Date} dsp_NgayTao - thời điểm dữ liệu được khởi tạo.
 * @property {Date} dsp_NgayCapNhat - thời điểm dữ liệu được cập nhật.
 */
const chiTietDanhSachPhatSchema = new mongoose.Schema(
  {
    dsp_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "danhSachPhat",
      required: [true, "mã danh sách phát không được để trống"],
    },
    bn_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "baiNhac",
      required: [true, "mã bài nhạc không được để trống"],
    },
  },
  {
    timestamps: { createdAt: "dsp_NgayTao", updatedAt: "dsp_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "dsp_ID" và tiền tố "CTDSP_" phía trước "_id" khóa chính.
chiTietDanhSachPhatSchema.virtual("ctdsp_ID").get(function () {
  return `CTDSP_${this._id}`;
});

const chiTietDanhSachPhat = mongoose.model(
  "chiTietDanhSachPhat",
  chiTietDanhSachPhatSchema,
);

export default chiTietDanhSachPhat;
