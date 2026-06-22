import mongoose from "mongoose";

/**
 * @typedef {Object} danhSachPhatSchema
 * @property {String} dsp_ID - Khóa chính, mã danh sách phát.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID - Khóa ngoại, mã người dùng.
 * @property {String} dsp_TenDanhSach - Tên danh sách phát.
 * @property {String} dsp_MoTa - Mô tả danh sách phát.
 * @property {Date} dsp_NgayTao - thời điểm dữ liệu được khởi tạo.
 * @property {Date} dsp_NgayCapNhat - thời điểm dữ liệu được cập nhật.
 */
const danhSachPhatSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "mã người dùng không được để trống"],
    },
    dsp_TenDanhSach: {
      type: String,
      required: [true, "tên danh sách phát không được để trống"],
    },
    dsp_MoTa: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "dsp_NgayTao", updatedAt: "dsp_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
// tạo trường ảo "dsp_ID" và tiền tố "DSP_" phía trước "_id" khóa chính.
danhSachPhatSchema.virtual("dsp_ID").get(function () {
  return `DSP_${this._id}`;
});

const danhSachPhat = mongoose.model("danhSachPhat", danhSachPhatSchema);

export default danhSachPhat;
