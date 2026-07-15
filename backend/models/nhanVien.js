import mongoose from "mongoose";

const nhanVienSchema = new mongoose.Schema(
  {
    tk_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "taiKhoan",
      required: [true, "Mã tài khoản không được để trống."],
    },
    vt_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vaiTro",
      required: [true, "Mã vai trò không được để trống."],
    },
    nv_HoVaTen: {
      type: String,
      required: [true, "Họ và tên nhân viên không được để trống."],
    },
    nv_SoDienThoai: {
      type: String,
      required: [true, "Số điện thoại không được để trống."],
      validate: {
        validator: function (v) {
          // kiểm tra số điện thoại theo nhà mạng Việt Nam đầy 03, 05, 07, 08, 09 kèm 8 chữ số phía sao
          return /^(03|05|07|08|09)\d{8}$/.test(v);
        },
        message: (props) =>
          `${props.value} không phải là số điện thoại hợp lệ tại Việt Nam.`,
      },
    },
    nv_DiaChi: {
      type: String,
      default: "",
    },
    nv_GioiTinh: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"],
      default: "Khác",
    },
    nv_NgaySinh: {
      type: Date,
      required: [true, "Ngày sinh không được để trống."],
      validate: {
        validator: function (v) {
          //nếu không nhập ngày sinh thì để trường required xử lý.
          if (!v) {
            return false;
          }
          const ngayHienTai = new Date();
          const ngaySinh = new Date(v);

          // tính toán số tuổi.
          let tuoi = ngayHienTai.getFullYear() - ngaySinh.getFullYear();
          const thangChenhLech = ngayHienTai.getMonth() - ngaySinh.getMonth();

          // nếu chưa đủ ngày thì giảm đi 1 tuổi.
          if (
            thangChenhLech < 0 ||
            (thangChenhLech === 0 && ngayHienTai.getDate() < ngaySinh.getDate())
          ) {
            tuoi--;
          }

          // trả về true nếu trên 18 tuổi và ngược lại trả về false
          return tuoi >= 18;
        },
        message: "người dùng phải từ đủ 18 tuổi trở lên mới được phép đăng ký",
      },
    },
    nv_AnhDaiDien: {
      type: String,
      default: "",
      required: [true, "Ảnh đại diện không được để trống."],
    },
    nv_CongViec: {
      type: String,
      default: "",
      required: [true, "Công việc không được để trống."],
    },
    nv_NgayVaoLam: {
      type: Date,
      default: Date.now,
      required: [true, "Ngày vào làm không được để trống."],
    },
  },
  {
    timestamps: { createdAt: "nv_NgayTao", updatedAt: "nv_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo nv_ID và thêm tiền tố "NV_" phía trước "_id" khóa chính.
nhanVienSchema.virtual("nv_ID").get(function () {
  return `NV_${this._id}`;
});

const nhanVien = mongoose.model("nhanVien", nhanVienSchema);
export default nhanVien;
