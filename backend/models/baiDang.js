import mongoose from "mongoose";

/**
 * @typedef {Object} baiDangSchema
 * @property {String} bd_ID - khóa chính, mã bài đăng.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID - khóa ngoại, mã người dùng.
 * @property {String} bd_NoiDung - Nội dung bài đăng (từ 1 đến 200 ký tự).
 * @property {[String]} bd_TepDinhKem - tệp đính kèm ảnh hoặc video (kiểu mảng String có thể đăng nhiều hình hoặc nhiều video).
 * @property {Number} bd_LuotThich - Tổng số lượt thích bài đăng (số nguyên dương không âm).
 * @property {Number} bd_LuotXem - Tổng số luợt xem bài đăng (số nguyên dương không âm).
 * @property {Number} bd_LuotChiaSe - Tổng số lượt chia sẻ bài đăng (số nguyên dương không âm).
 * @property {String} bd_TrangThai - Trạng thái bài đăng (công khai, riêng tư).
 * @property {Date} bd_NgayTao - thời điểm thông tin được khởi tạo.
 * @property {Date} bd_NgayCapNhat - thời điểm thông tin được cập nhật
 **/

const baiDangSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "mã người dùng không được để trống"],
    },
    bd_NoiDung: {
      type: String,
      required: [true, "Nội dung bài đăng không được để trống."],
      trim: true,
      maxLength: [200, "Nội dung bài đăng không được vượt quá 200 ký tự."],
    },
    bd_TepDinhKem: {
      type: [String],
      required: [true, "Tệp đính kèm không được để trống."],
    },
    bd_LuotThich: {
      type: Number,
      required: [true, "Lượt thích không được để trống."],
      default: 0,
      min: [0, "Lượt thích không được là số âm."],
      validate: {
        validator: Number.isInteger,
        message: "Lượt thích phải là một số nguyên.",
      },
    },
    bd_LuotXem: {
      type: Number,
      required: [true, "Lượt xem không được để trống."],
      default: 0,
      min: [0, "Lượt xem không được là số âm."],
      validate: {
        validator: Number.isInteger,
        message: "Lượt xem phải là một số nguyên.",
      },
    },
    bd_LuotChiaSe: {
      type: Number,
      required: [true, "Lượt chia sẻ không được để trống."],
      default: 0,
      min: [0, "Lượt chia sẻ không được là số âm."],
      validate: {
        validator: Number.isInteger,
        message: "Lượt chia sẻ phải là một số nguyên.",
      },
    },
  },
  {
    timestamps: { createdAt: "bd_NgayTao", updatedAt: "bd_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường "bd_ID" ảo và thêm tiền tố "BD_" phía trước "_id" khóa chính.
baiDangSchema.virtual("bd_ID").get(function () {
  return `BD_${this._id}`;
});

const baiDang = mongoose.model("baiDang", baiDangSchema);
export default baiDang;
