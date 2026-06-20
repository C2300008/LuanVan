/**
 * xử lý lỗi tập trung cho toàn ứng dụng (Global error handler)
 *
 * @param {Object} err - đối tượng chứa thông tin lỗi
 * @param {Object} req - đối tượng request từ client
 * @param {Object} res - Đối tượng resqonse gửi về client
 * @param {Function} next - hàm callback để chuyển tiếp sang middleware tiếp theo
 */
const errorHandler = (err, req, res, next) => {
  console.error("Hệ thống phát hiện lỗi: ", err.stack);

  // xác định mã lỗi HTTP (nếu không có mã lỗi mặc định là 500)
  const statusCode = err.statusCode || 500;

  // gửi phản hồi lỗi về cho phía client
  res.status(statusCode).json({
    success: false,
    message: err.message || "lỗi hệ thống nội bộ (Internal server error)",
    // chỉ hiện thị lỗi chi tiết vết lỗi (stack) ở môi trường phát triển (development) để sửa lỗi
    // khi chạy thực tế (production), ẩn đi (undefined) để bảo mật hệ thống
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
