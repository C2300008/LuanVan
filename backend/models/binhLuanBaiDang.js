import mongoose from "mongoose";

/**
 * @typedef {Object} binhLuanBaiDangSchema
 * @property {String} blbd_ID - khóa chính, mã bình luận bài đăng.
 * @property {mongoose.Schema.Types.ObjectId } nd_ID - khóa ngoại, mã người dùng.
 * @property {mongoose.Schema.Types.ObjectId } bd_ID - khóa ngoại, mã khóa ngoại.
 * @property {String} blbd_NoiDung - nội dung bình luận (không vượt quá 200 ký tự).
 * @property {String} blbd_DuongDan - đường dẫn phân cấp cha con (lưu ID bình luận cha phía trước, cách nhau bởi đấu / )
 * @property {Date} blbd_NgayBinhLuan - ngày bình luộn bài đăng (không lớn hơn ngày hiện tại).
 * @property {String} blbd_TrangThai - trạng thái bình luận bài đăng(đang xử lý,đã xóa, đã gửi).
 * @property {Date} blbd_NgayTao - thời điểm dữ liệu được khởi tạo.
 * @property {Date} blbd_NgayCapNhat - thời điểm dữ liệu được cập nhật.
 */
const binhLuanBaiDangSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống"],
    },
    bd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "baiDang",
      required: [true, "Mã bài đăng không được để trống."],
    },
    blbd_NoiDung: {
      type: String,
      required: [true, "nội dung không được để trống."],
      maxLength: [200, "Nội dung không được vượt quá 200 ký tự."],
    },
    blbd_DuongDan: {
      type: String,
      required: [true, "Đường đẫn không được để trống."],
    },
    blbd_NgayBinhLuan: {
      type: Date,
      required: [true, "Ngày bình luận không được để trống."],
      default: Date.now,
    },
    blbd_TrangThai: {
      type: String,
      require: [true, "Trạng thái không được để trống."],
      enum: ["Đang xử lý", "Đã gửi", "Đã xóa"],
      default: "Đang xử lý",
    },
  },
  {
    timestamps: { createdAt: "blbd_NgayTao", updatedAt: "blbd_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "blbd_ID" và tiền tố "BLBD_" phía trước "_id" khóa chính.
binhLuanBaiDangSchema.virtual("blbd_ID").get(function () {
  return `BLBD_${this._id}`;
});

// dánh index chỉ mục cho trường đường dẫn.
binhLuanBaiDangSchema.index({ blbd_DuongDan: 1 });
// đánh index cho cặp bài đăng và ngày bình luận.
binhLuanBaiDangSchema.index({ bd_ID: 1, blbd_NgayBinhLuan: -1 });

const binhLuanbaiDang = mongoose.model(
  "binhLuanBaidang",
  binhLuanBaiDangSchema,
);
export default binhLuanbaiDang;
