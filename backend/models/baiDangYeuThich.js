import mongoose from "mongoose";

/**
 * @typedef {Object} baiDangYeuThichSchema
 * @property {String} bdyt_ID - khóa chính, mã bài đăng yêu thích
 * @property {mongoose.Schema.Types.ObjectId} nd_ID - khóa ngoai, mã người dùng.
 * @property {mongoose.Schema.Types.ObjectId } bd_ID - khóa ngoại, mã bài đăng.
 * @property {Date} bdyt_NgayYeuThich - ngày yêu thích bài đăng.
 * @property {Date} bdyt_NgayTao - thời điểm thông tin được khởi tạo.
 * @property {Date} bdyt_NgayCapNhat - thời điểm thông tin được cập nhật.
 *
 */
const baiDangYeuThichSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống."],
    },
    bd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "baiDang",
      required: [true, "Mã bài đăng không được để trống"],
    },
    bdyt_NgayYeuThich: {
      type: Date,
      required: [true, "Ngày yêu thích không được để trống."],
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "bdyt_NgayTao", updatedAt: "bdyt_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "bdyt_ID" và thêm tiền tố "BDYT_" phía trước "_id" khóa chính.
baiDangYeuThichSchema.virtual("bdyt_ID").get(function () {
  return `BDYT_${this._id}`;
});

// Đánh index chỉ mục người dùng và bài đăng 'một người chỉ được thích 1 lần với một bài đăng'
baiDangYeuThichSchema.index({ nd_ID: 1, bd_ID: 1 }, { unique: true });

const baiDangYeuThich = mongoose.model(
  "baiDangYeuThich",
  baiDangYeuThichSchema,
);

export default baiDangYeuThich;
