import mongoose from "mongoose";

/**
 * @typedef {Object} xacThucNhacSiSchema
 * @property {String} xtnx_ID - Khóa chính, mã xác thực nhạc sĩ.
 * @property {mongoose.Types.ObjectId} nv_ID - Khóa ngoại, mã nhân viên thực hiện xác thực.
 * @property {mongoose.Types.ObjectId} nd_ID - Khóa ngoại, mã người dùng được xác thực.
 * @property {String[]} xtnx_TaiLieuChungThuc - Mảng chứa đường dẫn hoặc tên tài liệu chứng thực của nhạc sĩ.
 * @property {String} xtnx_TrangThai - Trạng thái xác thực (Chờ xác thực, Đã xác thực, Từ chối xác thực).
 * @property {Date} xtnx_NgayGui - Ngày và giờ gửi yêu cầu xác thực, mặc định là thời điểm hiện tại.
 * @property {Date} xtnx_NgayDuyet - Ngày và giờ duyệt yêu cầu xác thực, chỉ có giá trị khi trạng thái là "Đã xác thực" hoặc "Từ chối xác thực".
 * @property {Date} xtnx_NgayTao - Thời điểm thông tin được khởi tạo
 * @property {Date} xtnx_NgayCapNhat - thời điểm thông tin được cập nhật.
 */
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
