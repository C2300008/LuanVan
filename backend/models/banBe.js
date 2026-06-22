import mongoose from "mongoose";

/**
 * @typedef {Object} banBeSchema
 * @property {String} bb_ID - Khóa chính, mã lời mời kết bạn.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID_GuiLoiMoi - Khóa ngoại, mã người dùng gửi lời mời kết bạn.
 * @property {mongoose.Schema.Types.ObjectId} nd_ID_NhanLoiMoi - Khóa ngoại, mã người dùng nhận lời mời kết bạn.
 * @property {Date} bb_NgayGui - Ngày và giờ gửi lời mời kết bạn, mặc định là thời điểm hiện tại.
 * @property {String} bb_TrangThai - Trạng thái của lời mời kết bạn (Đang chờ, Đã chấp nhận, Đã từ chối).
 * @property {Date} bb_NgayTao - Thời điểm thông tin được khởi tạo
 * @property {Date} bb_NgayCapNhat - thời điểm thông tin được cập nhật.
 */
const banBeSchema = new mongoose.Schema(
  {
    nd_ID_GuiLoiMoi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng gửi lời mời không được để trống."],
    },
    nd_ID_NhanLoiMoi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng nhận lời mời không được để trống."],
    },
    bb_NgayGui: {
      type: Date,
      default: Date.now,
    },
    bb_TrangThai: {
      type: String,
      required: [true, "Trạng thái lời mời kết bạn không được để trống."],
      enum: ["Đang chờ", "Đã chấp nhận", "Đã từ chối"],
      default: "Đang chờ",
    },
  },
  {
    timestamps: { createdAt: "bb_NgayTao", updatedAt: "bb_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo bb_ID và thêm tiền tố "BB_" phía trước "_id" khóa chính.
banBeSchema.virtual("bb_ID").get(function () {
  return `BB_${this._id}`;
});

// Đánh index cho 2 trường nd_ID_GuiLoiMoi và nd_ID_NhanLoiMoi để tối ưu hiệu suất truy vấn.
banBeSchema.index(
  { nd_ID_GuiLoiMoi: 1, nd_ID_NhanLoiMoi: 1 },
  { unique: true },
);

const banBe = mongoose.model("banBe", banBeSchema);
export default banBe;
