import mongoose from "mongoose";

const cuocTroChuyenSchema = new mongoose.Schema(
  {
    ctc_TenCuocTroChuyen: {
      type: String,
      required: [true, "Tên cuộc trò chuyện không được bỏ trống."],
      trim: true,
      minLength: [2, "Tên cuộc trò chuyện phải chứa ít nhất 2 ký tự"],
      maxLength: [100, "Tên cuộc trò chuyện không được vượt quá 100 ký tự"],
    },
    ctc_SoLuongTinNhan: {
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "Số lượng tin nhắn phải là một số nguyên.",
      },
      min: [0, "Số lượng tin nhắn không được âm."],
    },
    ctc_TrangThai: {
      type: String,
      required: [true, "Trạng thái cuộc trò chuyện không được để trống."],
      default: "Hoạt động",
      enum: ["Hoạt động", "Ngưng hoạt động"],
    },
  },
  {
    timestamps: { createdAt: "ctc_NgayTao", updatedAt: "ctc_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo ctc_ID và thêm tiền tố "CTC_" phía trước "_id" khóa chính.
cuocTroChuyenSchema.virtual("ctc_ID").get(function () {
  return `CTC_${this._id}`;
});

const cuocTroChuyen = mongoose.model("cuocTroChuyen", cuocTroChuyenSchema);
export default cuocTroChuyen;
