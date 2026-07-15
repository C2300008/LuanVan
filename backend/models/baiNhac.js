import mongoose from "mongoose";

const baiNhacSchema = new mongoose.Schema(
  {
    ns_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nhacSi",
      required: [true, "Mã nhạc sĩ không được để trống."],
    },
    bn_TenBaiNhac: {
      type: String,
      trim: true,
      minLength: [1, "Tên bài nhạc phải chứa ít nhất 1 ký tự."],
      maxLength: [150, "Tên bài nhạc không được vượt quá 150 ký tự."],
    },
    bn_LoiBaiNhac: {
      type: String,
      default: "",
      trim: true,
      maxLength: [100000, "Lời bài hát không được vượt quá 100000 ký tự."],
    },
    bn_AnhBia: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          // mảng phải có ít nhất 1 phần tử thì mới hợp lệ.
          return v && v.length > 0;
        },
        message:
          "Ảnh bìa nhạc không được để trống. Hãy tải lên ít nhất 1 tấm ảnh.",
      },
    },
    bn_TepAmThanh: {
      type: String,
      required: [true, "Tệp âm thanh không được để trống."],
      trim: true,
    },
    bn_LuotNghe: {
      type: Number,
      default: 0,
      min: [0, "Số lượt nghe không được là số âm."],
      validate: {
        validator: Number.isInteger,
        message: "Số lượt nghe phải là một số nguyên.",
      },
    },
    bn_LuotThich: {
      type: Number,
      default: 0,
      min: [0, "Số lượt thích không được là số âm."],
      validate: {
        validator: Number.isInteger,
        message: "Số lượt thích phải là một số nguyên.",
      },
    },
    bn_LuotChiaSe: {
      type: Number,
      default: 0,
      min: [0, "Số lượt chia sẻ không được là số âm."],
      validate: {
        validator: Number.isInteger,
        message: "Số lượt chia sẻ phải là một số nguyên.",
      },
    },
    bn_TrangThai: {
      type: String,
      required: [true, "Trạng thái bài nhạc không được để trống."],
      default: "Có bảng quyền",
      trim: true,
    },
    bn_NgayDang: {
      type: Date,
      required: [true, "Ngày đăng bài nhạc không được để trống."],
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "bn_NgayTao", updatedAt: "bn_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo và thêm tiền tố "BN_" phía trước "_id" khóa chính.
baiNhacSchema.virtual("bn_ID").get(function () {
  return `BN_${this._id}`;
});

const baiNhac = mongoose.model("baiNhac", baiNhacSchema);
export default baiNhac;
