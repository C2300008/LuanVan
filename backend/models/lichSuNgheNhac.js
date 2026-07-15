import mongoose from "mongoose";

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
