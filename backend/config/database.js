const mongoose = require("mongoose"); // thư viện tương tác với mongoDB

// hàm xử lý kết nối Database (sử dụng cơ chết bất đồng bộ async/await).
const connectDB = async () => {
  try {
    // nạp chuỗi URI kết nối từ biến môi trường .env
    // mongoose sẽ tự động khởi tạo một pool(bể chứa kết nối) ngầm dưới hệ thống.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("đã kết nối cơ sở dữ liệu thành công");
  } catch (error) {
    // nếu có lỗi(vd: sai url, chưa bật mongoDb), xuất lỗi và dừng server
    console.error("lỗi kết nối database", error.message);
    process.exit(1); // dừng tiến trình node.js ngay lập tức.
  }

  // đóng kết nối an toàn khi tắt server.
  process.on("SIGINT", async () => {
    // bắt sự kiện khi bấm  Ctrl + C để tắt server (tín hiệu SIGINT).
    console.log("\n đang tiến hành ngắt kết nối Database...");
    await mongoose.connection.close();
    console.log("Đã đóng bể chứa kết nối Database an toàn.");
    process.exit(0);
  });
};

module.exports = connectDB;
