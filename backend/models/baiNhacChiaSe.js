import mongoose from "mongoose";

/**
 * @typedef {Object} BaiNhacChiaSe
 * @property {String} bncs_ID - mã chia sẻ bài nhạc, được tạo tự động với tiền tố "BNCS_" phía trước.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID - mã người dùng, tham chiếu đến bảng người dùng.
 * @property {mongoose.Schema.Types.ObjectId} bn_ID - mã bài nhạc, tham chiếu đến bảng bài nhạc.
 * @property {Date} bncs_NgayChiaSe - ngày chia sẻ bài nhạc.
 * @property {Date} bncs_NgayTao - thời điểm dữ liệu được khởi tạo.
 * @property {Date} bncs_NgayCapNhat - thời điểm dữ liệu được cập nhật.
 */
const baiNhacChiaSeSchema = new mongoose.Schema(
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
    bncs_NgayChiaSe: {
      type: Date,
      default: Date.now,
      required: [true, "Ngày chia sẻ không được để trống."],
    },
  },
  {
    timestamps: { createdAt: "bncs_NgayTao", updatedAt: "bncs_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "bncs_ID" và tiền tố "BNCS_" phía trước "_id" khóa chính.
baiNhacChiaSeSchema.virtual("bncs_ID").get(function () {
  return `BNCS_${this._id}`;
});

// đánh index cho cặp người dùng và bài nhạc để tối ưu truy vấn 'mỗi người chỉ được chia sẻ một lần đối với một bài nhạc'.
baiNhacChiaSeSchema.index({ nd_ID: 1, bn_ID: 1 }, { unique: true });

const baiNhacChiaSe = mongoose.model("baiNhacChiaSe", baiNhacChiaSeSchema);
export default baiNhacChiaSe;
