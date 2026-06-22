import mongoose from "mongoose";
/**
 * @typedef {Object} chiTietBaiNhacSchema
 * @property {String} ctbn_ID - Khóa chính, mã chi tiết bài nhạc.
 * @property {mongoose.Schema.Types.ObjectId } bn_ID - Khóa ngoại, mã bài nhạc.
 * @property {mongoose.Schema.Types.ObjectId } tln_ID - Khóa ngoại, mã thể loại nhac.
 * @property {String} ctbn_TrangThai - Trạng thái chi tiết thể loại( hoạt động, ngưng hoạt động).
 * @property {Date} ctbn_NgayTao - Thời điểm thông tin được khởi tạo
 * @property {Date} ctbn_NgayCapNhat - thời điểm thông tin được cập nhật.
 */
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
