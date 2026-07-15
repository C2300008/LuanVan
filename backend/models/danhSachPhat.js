import mongoose from "mongoose";

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
