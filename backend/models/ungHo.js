import mongoose from "mongoose";

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
