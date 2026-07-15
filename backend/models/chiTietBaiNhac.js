import mongoose from "mongoose";

const chiTietBaiNhacSchema = new mongoose.Schema(
  {
    bn_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "baiNhac",
      required: [true, "Mã bài nhạc không được để trống"],
    },
    tln_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theLoaiNhac",
      required: [true, "Mã thể loại nhạc không được để trống."],
    },
    ctbn_TrangThai: {
      type: String,
      required: [true, "Trạng thái chi tiết thể loại không được bỏ trống"],
      enum: ["Hoạt động", "Ngưng hoạt động"],
      default: "Hoạt động",
    },
  },
  {
    timestamps: { createdAt: "ctbn_NgayTao", updatedAt: "ctbn_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Đảm bảo trong database không bao giờ trùng lặp cùng một cặp (bài nhạc + thể loại)
chiTietBaiNhacSchema.index({ bn_ID: 1, tln_ID: 1 }, { unique: true });

// Tạo trường ảo và thêm tiền tố "CTTL_" phía trước "_id" khóa chính.
chiTietBaiNhacSchema.virtual("ctbn_ID").get(function () {
  return `CTBN_${this._id}`;
});

const chiTietBaiNhac = mongoose.model("chiTietBaiNhac", chiTietBaiNhacSchema);
export default chiTietBaiNhac;
