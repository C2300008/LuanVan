import mongoose from "mongoose";
/**
 * @typedef {Object} quyenRiengTuSchema
 * @property {String} qrt_ID - Khóa chính, mã quyền riêng tư.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID - Khóa ngoại, mã người dùng.
 * @property {Boolean} qrt_AnThongTinCaNhan - Quyền ẩn thông tin cá nhân (true: ẩn, false: không ẩn).
 * @property {Date} qrt_NgayTao - thời điểm dữ liệu được khởi tạo.
 * @property {Date} qrt_NgayCapNhat - thời điểm dữ liệu được cập nhật.
 *
 */
const quyenRiengTuSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống."],
      unique: true,
    },
    qrt_AnThongTinCaNhan: {
      type: Boolean,
      required: [true, "Ẩn thông tin cá nhân không được để trống."],
      default: false,
    },
  },
  {
    timestamps: { createdAt: "qrt_NgayTao", updatedAt: "qrt_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "qrt_ID" và tiền tố "QRT_" phía trước "_id" khóa chính.
quyenRiengTuSchema.virtual("qrt_ID").get(function () {
  return `QRT_${this._id}`;
});

const quyenRiengTu = mongoose.model("quyenRiengTu", quyenRiengTuSchema);
export default quyenRiengTu;
