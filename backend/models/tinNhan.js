import mongoose from "mongoose";

const tinNhanSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống."],
    },
    ctc_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cuocTroChuyen",
      required: [true, "Mã cuộc trò chuyện không được để trống."],
    },
    tn_NoiDung: {
      type: String,
      required: [true, "Nội dung tin nhắn không được để trống."],
      trim: true,
      minLength: [1, "Nội dung tin nhắn phải chứa ít nhất 1 ký tự."],
      maxLength: [1000, "Nội dung tin nhắn không được vượt quá 1000 ký tự."],
    },
    tn_NgayGui: {
      type: Date,
      default: Date.now,
    },
    tn_TrangThai: {
      type: String,
      required: [true, "Trạng thái tin nhắn không được để trống."],
      enum: ["Đã gửi", "Đã nhận", "Đã đọc"],
      default: "Đã gửi",
    },
  },
  {
    timestamps: { createdAt: "tn_NgayTao", updatedAt: "tn_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo tn_ID và thêm tiền tố "TN_" phía trước "_id" khóa chính.
tinNhanSchema.virtual("tn_ID").get(function () {
  return `TN_${this._id}`;
});

const tinNhan = mongoose.model("tinNhan", tinNhanSchema);
export default tinNhan;
