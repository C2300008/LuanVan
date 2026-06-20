import mongoose from "mongoose";

/**
 * @typedef {Object} thanhVienCuocTroTruyenSchema
 * @property {String} tvctt_ID - Khóa chính, mã thành viên cuộc trò truyện.
 * @property {mongoose.Types.ObjectId} ctc_ID - Khóa ngoại, mã cuộc trò truyện.
 * @property {mongoose.Types.ObjectId} nd_ID - Khóa ngoại, mã người dùng.
 * @property {Date} tvctt_NgayThamGia - Ngày người dùng tham gia cuộc trò truyện.
 * @property {String} tvctt_TrangThai - Trạng thái thành viên cuộc trò truyện (Đang tham gia, Đã rời đi).
 * @property {Date} tvctt_NgayTao - Thời điểm thông tin được khởi tạo
 * @property {Date} tvctt_NgayCapNhat - thời điểm thông tin được cập nhật.
 */
const thanhVienCuocTroTruyenSchema = new mongoose.Schema(
  {
    ctc_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cuocTroTruyen",
      required: [true, "Mã cuộc trò truyện không được để trống."],
    },
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống."],
    },
    tvctt_NgayThamGia: {
      type: Date,
      default: Date.now,
    },
    tvctt_TrangThai: {
      type: String,
      required: [
        true,
        "Trạng thái thành viên cuộc trò truyện không được để trống.",
      ],
      enum: ["Đang tham gia", "Đã rời đi"],
      default: "Đang tham gia",
    },
  },
  {
    timestamps: { createdAt: "tvctt_NgayTao", updatedAt: "tvctt_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo tvctt_ID và thêm tiền tố "TVCTT_" phía trước "_id" khóa chính.
thanhVienCuocTroTruyenSchema.virtual("tvctt_ID").get(function () {
  return `TVCTT_${this._id}`;
});

const thanhVienCuocTroTruyen = mongoose.model(
  "thanhVienCuocTroTruyen",
  thanhVienCuocTroTruyenSchema,
);
export default thanhVienCuocTroTruyen;
