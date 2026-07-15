import mongoose from "mongoose";

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
