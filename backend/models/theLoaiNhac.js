import mongoose from "mongoose";

const theLoaiNhacSchema = new mongoose.Schema(
  {
    tln_TenTheLoai: {
      type: String,
      required: [true, "Tên thể loại nhạc không được bỏ trống."],
      unique: true,
      trim: true,
      minLength: [2, "Tên thể loại nhạc phải chứa ít nhất 2 ký tự"],
      maxLength: [50, "Tên thể loại nhạc không được vượt quá 50 ký tự"],
    },
    tln_Mota: {
      type: String,
      default: "",
      trim: true,
      maxLength: [500, "Mô tả thể loại không được vượt quá 500 ký tự."],
    },
    tln_TrangThai: {
      type: String,
      required: [true, "Trạng thái thể loại không được để trống."],
      default: "Hoạt động",
      enum: ["Hoạt động", "Ngưng hoạt động"],
    },
  },
  {
    timestamps: { createdAt: "tln_NgayTao", updatedAt: "tln_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo tln_ID và thêm tiền tố "TLN_" phía trước "_id" khóa chính.
theLoaiNhacSchema.virtual("tln_ID").get(function () {
  return `TLN_${this._id}`;
});

const theLoaiNhac = mongoose.model("theLoaiNhac", theLoaiNhacSchema);
export default theLoaiNhac;
