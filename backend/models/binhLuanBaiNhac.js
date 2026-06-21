import mongoose from "mongoose";

/**
 * @typedef {Object} binhLuanBaiNhacSchema
 * @property {String} blbn_ID - khóa chính, mã bình luận bài nhạc, được tạo tự động với tiền tố "BLBN_" phía trước.
 * @property {mongoose.Schema.Types.ObjectId} bn_ID - mã bài nhạc, tham chiếu đến bảng bài nhạc.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID - mã người dùng, tham chiếu đến bảng người dùng.
 * @property {String} blbn_NoiDung - nội dung bình luận bài nhạc.
 * @property {Date} blbn_NgayBinhLuan - ngày bình luận bài nhạc.
 * @property {String} trangThai - trạng thái bình luận bài nhạc (đang xử lý, đã gửi, đã xóa).
 * @property {Date} blbn_NgayTao - thời điểm dữ liệu được khởi tạo.
 * @property {Date} blbn_NgayCapNhat - thời điểm dữ liệu được cập nhật.
 */
const binhLuanBaiNhacSchema = new mongoose.Schema(
  {
    bn_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "baiNhac",
      required: [true, "mã bài nhạc không được để trống"],
    },
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "mã người dùng không được để trống"],
    },
    blbn_NoiDung: {
      type: String,
      required: [true, "nội dung bình luận không được để trống"],
    },
    blbn_NgayBinhLuan: {
      type: Date,
      default: Date.now,
      required: [true, "ngày bình luận không được để trống"],
    },
    trangThai: {
      type: String,
      enum: ["Đang xử lý", "Đã gửi", "Đã xóa"],
      default: "Đang xử lý",
    },
  },
  {
    timestamps: { createdAt: "blbn_NgayTao", updatedAt: "blbn_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "blbn_ID" và tiền tố "BLBN_" phía trước "_id" khóa chính.
binhLuanBaiNhacSchema.virtual("blbn_ID").get(function () {
  return `BLBN_${this._id}`;
});

// đánh index cho cặp bài nhạc và ngày bình luận.
binhLuanBaiNhacSchema.index({ bn_ID: 1, blbn_NgayBinhLuan: -1 });

const binhLuanBaiNhac = mongoose.model(
  "binhLuanBaiNhac",
  binhLuanBaiNhacSchema,
);
export default binhLuanBaiNhac;
