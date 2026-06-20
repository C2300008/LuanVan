import mongoose from "mongoose";

/**
 * @typedef {Object} ungHoSchema
 * @property {String} uh_ID - Khóa chính, mã ủng hộ.
 * @property {mongoose.Types.ObjectId} nd_ID - Khóa ngoại, mã người dùng.
 * @property {mongoose.Types.ObjectId} ns_ID - Khóa ngoại, mã nhạc sĩ được ủng hộ.
 * @property {String} uh_LoiNhan - lời nhắn của người dùng khi ủng hộ (không được để trống, tối đa 200 ký tự).
 * @property {Date} uh_NgayTao - thời điểm dữ liệu được khởi tạo.
 * @property {Date} uh_NgayCapNhat - thời điểm dữ liệu được cập nhật.
 */
const ungHoSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống"],
    },
    ns_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nhacSi",
      required: [true, "Mã nhạc sĩ không được để trống."],
    },
    uh_LoiNhan: {
      type: String,
      required: [true, "Lời nhắn không được để trống."],
      maxLength: [200, "Lời nhắn không được vượt quá 200 ký tự."],
    },
  },
  {
    timestamps: { createdAt: "uh_NgayTao", updatedAt: "uh_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "uh_ID" và tiền tố "UH_" phía trước "_id" khóa chính.
ungHoSchema.virtual("uh_ID").get(function () {
  return `UH_${this._id}`;
});

const ungHo = mongoose.model("ungHo", ungHoSchema);
export default ungHo;
