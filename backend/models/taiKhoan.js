import mongoose from "mongoose";

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
