import mongoose from "mongoose";

/**
 *
 * @typedef {Object} baiNhacSchema
 * @property {String} bn_ID - khóa chính, mã bài nhạc.
 * @property {mongoose.Schema.Types.ObjectId} ns_ID - khóa ngoại, mã nhạc sĩ.
 * @property {String} bn_TenBaiNhac - Tên của bài nhạc (từ 1 đến 150 ký tự).
 * @property {String} bn_LoiBaiNhac - Lời chi tiết của bài nhạc (có thể để trống).
 * @property {String[]} bn_AnhBia - Mảng danh sách đường dẫn URL lưu trữ hình ảnh bìa của bài nhạc.
 * @property {String} bn_TepAmThanh - Đường dẫn tệp tin âm thanh (.mp3, .wav) lưu trên server.
 * @property {Number} bn_LuotNghe - Tổng lượt nghe của bài nhạc (số nguyên dương >= 0).
 * @property {Number} bn_LuotThich - Tổng số lượt thích từ người dùng (só nguyên dương >= 0).
 * @property {Number} bn_LuotChiaSe - Tổng số lượt chia sẻ bài nhạc (Số nguyên dương >= 0).
 * @property {String} bn_TrangThai - Trạng thái bài nhạc (miễn phí, có bảng quyền).
 * @property {Date} bn_NgayDang - Ngày chính thức phát hành bài nhạc.
 * @property {Date} bn_NgayTao - thời điểm thông tin được khởi tạo.
 * @property {Date} bn_NgayCapNhat - thời điểm thông tin được cập nhật.
 */
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
