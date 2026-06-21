import mongoose from "mongoose";
/**
 * @typedef {Object} baiNhacYeuThichSchema
 * @property {String} bnyt_ID - mã yêu thích bài nhạc, được tạo tự động với tiền tố "BNYT_" phía trước.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID - mã người dùng, tham chiếu đến bảng người dùng.
 * @property {mongoose.Schema.Types.ObjectId} bn_ID - mã bài nhạc, tham chiếu đến bảng bài nhạc.
 * @property {Date} bnyt_NgayYeuThich - ngày yêu thích bài nhạc.
 * @property {Date} bnyt_NgayTao - thời điểm dữ liệu được khởi tạo.
 * @property {Date} bnyt_NgayCapNhat - thời điểm dữ liệu được cập nhật.
 */
const baiNhacYeuThichSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống."],
    },
    bn_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "baiNhac",
      required: [true, "Mã bài nhạc không được để trống."],
    },
    bnyt_NgayYeuThich: {
      type: Date,
      default: Date.now,
      required: [true, "Ngày yêu thích không được để trống."],
    },
  },
  {
    timestamps: { createdAt: "bnyt_NgayTao", updatedAt: "bnyt_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "bnyt_ID" và tiền tố "BNYT_" phía trước "_id" khóa chính.
baiNhacYeuThichSchema.virtual("bnyt_ID").get(function () {
  return `BNYT_${this._id}`;
});

// đánh index cho cặp người dùng và bài nhạc để tối ưu truy vấn 'mỗi người chỉ được yêu thích một lần đối với một bài nhạc'.
baiNhacYeuThichSchema.index({ nd_ID: 1, bn_ID: 1 }, { unique: true });

const baiNhacYeuThich = mongoose.model(
  "baiNhacYeuThich",
  baiNhacYeuThichSchema,
);
export default baiNhacYeuThich;
