import mongoose from "mongoose";
/**
 *
 * @typedef {Object} taiKhoanSchema
 * @property {String} tk_ID - khóa chính, mã tài khoản.
 * @property {String} tk_TenDangNhap - Tên đăng nhập của tài khoản là duy nhất (từ 5 - 30 ký tự).
 * @property {String} tk_Email - Email của tài khoản(phải đúng định dạng email, tự động viết thường).
 * @property {String} tk_MatKhau - Mật khẩu đã được mã hóa (yêu cầu có độ dày ít nhất 6 ký tự).
 * @property {String} tk_TrangThai - Trạng thái khoạt động của tài khoản (hoạt động, bị khóa).
 * @property {null | Date} tk_LanDangNhapCuoi - thời gian hoạt động cuối.
 * @property {Date} tk_NgayTao - thời điểm tài khoản được đăng ký.
 * @property {Date} tk_NgayCapNhat - thời điểm thông tin tài khoản bị thay đổi.
 */

const taiKhoanSchema = new mongoose.Schema(
  {
    tk_tenDangNhap: {
      type: String,
      required: [true, "Tên đăng nhập không được để trống."],
      unique: true,
      trim: true,
      minLength: [5, "Tên đăng nhập phải chưa ít nhất 5 ký tự."],
      maxLength: [30, "Tên đăng nhập không vượt quá 30 ký tự"],
    },
    tk_Email: {
      type: String,
      required: [true, "Email không được để trống."],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          //biểu thức để kiểm tra email
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} địa chỉ email không hợp lệ.`,
      },
    },
    tk_MatKhau: {
      type: String,
      required: [true, "Mật khẩu không được để trống."],
      minLength: [6, "Mật khẩu phải chứa ít nahtas 6 ký tự"],
    },
    tk_TrangThai: {
      type: String,
      required: [true, "Trang thái không được để trống."],
      default: "HoatDong",
    },
    tk_LanDangNhapCuoi: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "tk_NgayTao", updatedAt: "tk_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo và thêm tiền tố "TK_" phía trước "_id" khóa chính.
taiKhoanSchema.virtual("tk_ID").get(function () {
  return `TK_${this._id}`;
});

const taiKhoan = mongoose.model("taiKhoan", taiKhoanSchema);
export default taiKhoan;
