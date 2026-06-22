import mongoose from "mongoose";

/**
 *
 *
 * @typedef {Object} nguoiDungSchema
 * @property {String} nd_ID - khóa chính, mã người dùng.
 * @property {mongoose.Schema.Types.ObjectId } tk_ID - khóa ngoại, mã tài khoản.
 * @property {String} nd_HoVaTen - họ và tên của người dùng (từ 2 đến 50 ký tự).
 * @property {Date} nd_NgaySinh - Ngày tháng năm sinh của người dùng.
 * @property {String} nd_GioiTinh - Giới tính người dùng (nam, nữ, khác).
 * @property {String} nd_DiaChi - Địa chỉ nơi ở của người dùng (tối đa 200 ký tự).
 * @property {String} nd_SoDienThoai - Số điện thoại người dùng (đúng định dạng nhà mạng Việt Nam).
 * @property {String} nd_AnhDaiDien - Ảnh đại diện  của người dùng(đương dẫn URL).
 * @property {String} nd_TieuSu - Tiểu sử đoạn giới thiệu ngắn của bảng thân (tối đa 500 ký tự).
 * @property {String} nd_TrangThai - Trang Thái hoạt động cá nhân (hoạt động, bị khóa).
 * @property {Date} nd_NgayTao - thời điểm thông tin người dugnf được khởi tạo.
 * @property {Date} nd_NgayCapNhat - thời điểm thông tin người dùng được thay đổi.
 */

const nguoiDungSchema = new mongoose.Schema(
  {
    tk_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaiKhoan", // tham chiếu đến bảng tài khoản
      required: [true, "Mã tài khoản không được để trống."],
    },
    nd_HoVaTen: {
      type: String,
      required: [true, "Họ và tên không được để trống."],
      trim: true,
      minLength: [2, "Họ và tên phải chưa ít nhất 2 ký tự"],
      maxLength: [50, "Họ và tên không được vượt quá 50 ký tự."],
    },
    nd_NgaySinh: {
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
    nd_DiaChi: {
      type: String,
      default: "",
      trim: true,
      maxLength: [200, "Địa chỉ không được vượt quá 200 ký tự."],
    },
    nd_SoDienThoai: {
      type: String,
      required: [true, "Số điện thoại không được để trống."],
      trim: true,
      validate: {
        validator: function (v) {
          // kiểm tra số điện thoại theo nhà mạng Việt Nam đầy 03, 05, 07, 08, 09 kèm 8 chữ số phía sao
          return /^(03|05|07|08|09)\d{8}$/.test(v);
        },
        message: (props) =>
          `${props.value} không phải là số điện thoại hợp lệ tại Việt Nam.`,
      },
    },
    nd_AnhDaiDien: {
      type: String,
      default: "",
    },
    nd_TieuSu: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "tiểu sư cá nhân không được vượt quá 500 ký tự."],
    },
    nd_TrangThai: {
      type: String,
      required: [
        true,
        "Trạng thái hoạt động của người dùng không được để trống.",
      ],
      default: "HoatDong",
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "nd_NgayTao", updatedAt: "nd_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Tạo trường ảo "nd_ID" thêm tiền tố "ND_" phía trước "_id" khóa chính.
nguoiDungSchema.virtual("nd_ID").get(function () {
  return `ND_${this._id}`;
});

const nguoiDung = mongoose.model("nguoiDung", nguoiDungSchema);

export default nguoiDung;
