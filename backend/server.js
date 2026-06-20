require("dotenv").config(); // thư viện biết môi trường.
const express = require("express"); // thư viện framework web

const connectDB = require("./config/database"); // hàm kết nối database trong file config
const errorHandler = require("./middlewares/errorHandler");
const app = express();
app.use(express.json());

connectDB(); // kích hoạt hàm kết nối database.

// route chạy thử
app.get("/", (req, res) => {
  res.send("API node.js đã vận hành");
});

app.use(errorHandler); //kích hoạt hàm xử lý lỗi tập trung;

const PORT = process.env.PORT || 8080;
// lắng nghe các yêu cầu từ cổng đã cấu hình
app.listen(PORT, () => {
  console.log(
    `server đang lắng nghe tại cổng tại cổng : http://localhost:${PORT}`,
  );
});
