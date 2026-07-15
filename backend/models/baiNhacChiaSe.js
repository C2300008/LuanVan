import mongoose from "mongoose";

const baiNhacChiaSeSchema = new mongoose.Schema(
  {
    nd_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nguoiDung",
      required: [true, "Mã người dùng không được để trống."],
    },
    bn_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "baiNhac",
      required: [true, "Mã bài nhạc không được để trống."],
    },
    bncs_NgayChiaSe: {
      type: Date,
      default: Date.now,
      required: [true, "Ngày chia sẻ không được để trống."],
    },
  },
  {
    timestamps: { createdAt: "bncs_NgayTao", updatedAt: "bncs_NgayCapNhat" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tạo trường ảo "bncs_ID" và tiền tố "BNCS_" phía trước "_id" khóa chính.
baiNhacChiaSeSchema.virtual("bncs_ID").get(function () {
  return `BNCS_${this._id}`;
});

// đánh index cho cặp người dùng và bài nhạc để tối ưu truy vấn 'mỗi người chỉ được chia sẻ một lần đối với một bài nhạc'.
baiNhacChiaSeSchema.index({ nd_ID: 1, bn_ID: 1 }, { unique: true });

const baiNhacChiaSe = mongoose.model("baiNhacChiaSe", baiNhacChiaSeSchema);
export default baiNhacChiaSe;
