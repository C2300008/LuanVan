import mongoose from "mongoose";
/**
 * @typedef {Object} cuocTroChuyenSchema
 * @property {String} ctc_ID - Khóa chính, mã cuộc trò chuyện.
 * @property {String} ctc_TenCuocTroChuyen - Tên của cuộc trò chuyện (từ 2 đến 100 ký tự).
 * @property {Number} ctc_SoLuongTinNhan - Số lượng tin nhắn trong cuộc trò chuyện, mặc định là 0 và không âm.
 * @property {String} ctc_TrangThai - Trạng thái hoạt động của cuộc trò chuyện (Hoạt động, Ngưng hoạt động).
 * @property {Date} ctc_NgayTao - thời điểm bảng cuộc trò chuyện được khởi tạo
 * @property {Date} ctc_NgayCapNhat - thời điểm thông tin bảng cuộc trò chuyện được cập nhật.
 */
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
