import mongoose from "mongoose";

const theoDoiSchema = new mongoose.Schema(
  {
    nd_ID_TheoDoi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng theo dõi không được để trống."],
    },
    nd_ID_DuocTheoDoi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng được theo dõi không được để trống."],
    },
    td_TrangThai: {
      type: String,
      required: [true, "Trạng thái theo dõi không được để trống."],
      enum: ["Đang theo dõi", "Đã hủy theo dõi"],
      default: "Đang theo dõi",
    },
  },
  {
    timestamps: { createdAt: "td_NgayTao", updatedAt: "td_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo td_ID và thêm tiền tố "TD_" phía trước "_id" khóa chính.
theoDoiSchema.virtual("td_ID").get(function () {
  return `TD_${this._id}`;
});

const theoDoi = mongoose.model("theoDoi", theoDoiSchema);
export default theoDoi;
