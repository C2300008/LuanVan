import mongoose from "mongoose";

const xacThucNhacSiSchema = new mongoose.Schema(
  {
    nv_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nhanVien",
      required: [true, "Mã nhân viên không được để trống."],
    },
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống."],
    },
    xtnx_TaiLieuChungThuc: {
      type: [String],
      required: [true, "Tài liệu chứng thực không được để trống."],
    },
    xtnx_TrangThai: {
      type: String,
      required: [true, "Trạng thái xác thực không được để trống."],
      enum: ["Chờ xác thực", "Đã xác thực", "Từ chối xác thực"],
      default: "Chờ xác thực",
    },
    xtnx_NgayGui: {
      type: Date,
      default: Date.now,
    },
    xtnx_NgayDuyet: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "xtnx_NgayTao", updatedAt: "xtnx_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo xtnx_ID và thêm tiền tố "XTNX_" phía trước "_id" khóa chính.
xacThucNhacSiSchema.virtual("xtnx_ID").get(function () {
  return `XTNX_${this._id}`;
});

const xacThucNhacSi = mongoose.model("xacThucNhacSi", xacThucNhacSiSchema);
export default xacThucNhacSi;
