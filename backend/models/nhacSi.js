import mongoose from "mongoose";

/**
 *
 * @typedef {Object} nhacSiSchema
 * @property {String} ns_ID - khóa chính, mã nhạc sĩ.
 * @property {mongoose.Types.ObjectId} nd_ID - khóa ngoại, mã người dùng.
 * @property {String} ns_NgheDanh - Nghệ danh hoạt động nghệ thuật (từ 2 đến 50 ký tự).
 * @property {String} ns_MoTa - Đoạn văn mộ tả tiểu sư bảng thân nghệ sĩ (tối đa 1000 ký tự).
 * @property {Date} ns_NgayTao - Thời điểm hồ sơ nhạc sĩ được tạo thành công.
 * @property {Date} ns_NgayCapNhat - Thời điểm hồ sơ nhạc sĩ được sử đổi.
 */
const nhacSiSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống."],
      unique: true,
    },
    ns_NgheDanh: {
      type: String,
      required: [true, "Nghệ danh nghệ sĩ không được để trống"],
      trim: true,
      minLength: [2, "Nghệ danh phải ít nhất 2 ký tự."],
      maxLength: [50, "Nghê danh không được vượt quá 50 ký tự."],
    },
    ns_MoTa: {
      type: String,
      default: "",
      trim: true,
      maxLength: [1000, "Thông tin mô tả không được vượt quá 1000 ký tự."],
    },
  },
  {
    timestamps: { createdAt: "ns_NgayTao", updatedAt: "ns_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo và thêm tiền tố "NS_" phía trước "_id" khóa chính.
nhacSiSchema.virtual("ns_ID").get(function () {
  return `NS_${this._id}`;
});

const nhacSi = mongoose.model("nhacSi", nhacSiSchema);
export default nhacSi;
