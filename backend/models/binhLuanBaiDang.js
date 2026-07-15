import mongoose from "mongoose";


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
