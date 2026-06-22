import mongoose from "mongoose";

/**
 * @typedef {Object} baiDangChiaSeSchema
 * @property {String} bdcs_ID - khóa chính, mã bài đăng chia sẻ, được tạo tự động với tiền tố "BDCS_" phía trước.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID - khóa ngoai, mã người dùng.
 * @property {mongoose.Schema.Types.ObjectId } bd_ID - khóa ngoại, mã bài đăng.
 * @property {Date} bdcs_NgayChiaSe - ngày chia se bài đăng.
 * @property {Date} bdcs_NgayTao - thời điểm thông tin được khởi tạo.
 * @property {Date} bdcs_NgayCapNhat - thời điểm thông tin được cập nhật.
 *
 */
const baiDangChiaSeSchema = new mongoose.Schema(
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
    bdcs_NgayChiaSe: {
      type: Date,
      required: [true, "Ngày yêu thích không được để trống."],
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "bdcs_NgayTao", updatedAt: "bdcs_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "bdcs_ID" và thêm tiền tố "BDCS_" phía trước "_id" khóa chính.
baiDangChiaSeSchema.virtual("bdcs_ID").get(function () {
  return `BDCS_${this._id}`;
});

// Đánh index chỉ mục người dùng và bài đăng 'một người chỉ được tính chia sẽ 1 lần với một bài đăng'
baiDangChiaSeSchema.index({ nd_ID: 1, bd_ID: 1 }, { unique: true });

const baiDangChiaSe = mongoose.model("baiDangChiaSe", baiDangChiaSeSchema);

export default baiDangChiaSe;
