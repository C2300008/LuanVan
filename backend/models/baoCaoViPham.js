import mongoose from "mongoose";

/**
 * @typedef {Object} baoCaoViPhamSchema
 * @property {String} bcvp_ID - Khóa chính, mã báo cáo vi phạm.
 * @property {mongoose.Types.ObjectId} nv_ID - Khóa ngoại, mã nhân viên xử lý báo cáo (có thể null nếu chưa được phân công).
 * @property {mongoose.Types.ObjectId} nd_ID_BaoCao - Khóa ngoại, mã người dùng thực hiện báo cáo.
 * @property {mongoose.Types.ObjectId} nd_ID_BiBaoCao - Khóa ngoại, mã người dùng bị báo cáo vi phạm.
 * @property {String} bcvp_LoaiViPham - Loại vi phạm (ví dụ: "Nội dung không phù hợp", "Spam", "Lạm dụng", v.v.).
 * @property {String} bcvp_NoiDung - Nội dung chi tiết của báo cáo vi phạm.
 * @property {String} bcvp_TrangThai - Trạng thái xử lý báo cáo (Chờ xử lý, Đang xử lý, Đã xử lý).
 * @property {Date} bcvp_NgayBaoCao - Ngày và giờ khi báo cáo được tạo, mặc định là thời điểm hiện tại.
 * @property {Date} bcvp_NgayTao - Thời điểm thông tin được khởi tạo
 * @property {Date} bcvp_NgayCapNhat - thời điểm thông tin được cập nhật.
 */
const baoCaoViPhamSchema = new mongoose.Schema(
  {
    nv_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nhanVien",
    },
    nd_ID_BaoCao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng báo cáo không được để trống."],
    },
    nd_ID_BiBaoCao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng bị báo cáo không được để trống."],
    },
    bcvp_LoaiViPham: {
      type: String,
      required: [true, "Loại vi phạm không được để trống."],
    },
    bcvp_NoiDung: {
      type: String,
      required: [true, "Nội dung báo cáo không được để trống."],
      maxlength: [1000, "Nội dung báo cáo không được vượt quá 1000 ký tự."],
    },
    bcvp_TrangThai: {
      type: String,
      required: [true, "Trạng thái báo cáo không được để trống."],
      enum: ["Chờ xử lý", "Đang xử lý", "Đã xử lý"],
      default: "Chờ xử lý",
    },
    bcvp_NgayBaoCao: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "bcvp_NgayTao", updatedAt: "bcvp_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo bcvp_ID và thêm tiền tố "BCVP_" phía trước "_id" khóa chính.
baoCaoViPhamSchema.virtual("bcvp_ID").get(function () {
  return `BCVP_${this._id}`;
});

const baoCaoViPham = mongoose.model("baoCaoViPham", baoCaoViPhamSchema);
export default baoCaoViPham;
