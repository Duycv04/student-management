import pool from "../config/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

//  upLoad img
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

// API: Lấy hồ sơ sinh viên
export const getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const result = await pool.query(
      "SELECT  student_code, name, dob, gender, email, phone, class_id,img FROM sinhvien WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Not found students" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// API: Cập nhật hồ sơ sinh viên
export const updateProfile = async (req, res) => {
  const { name, dob, gender, phone, class_id } = req.body;
  const studentCode = req.user.student_code;
  let imgPath = null;
  if (req.file) {
    imgPath = req.file.filename;
  }
  try {
    const current = await pool.query(
      "SELECT img FROM sinhvien WHERE id=$",
      [studentCode]
    );
    const currentImg = current.rows[0]?.img;

    await pool.query(
      `UPDATE sinhvien 
       SET student_code=$1,name=$2, dob=$3, gender=$4, phone=$5, class_id=$6, img=COALESCE($7, img)
       WHERE id=$8`,
      [student_code,name, dob, gender, phone, class_id, imgPath, studentCode]
    );

    // Xoá ảnh cũ nếu có ảnh mới
    if (imgPath && currentImg && fs.existsSync(`uploads/${currentImg}`)) {
      fs.unlinkSync(`uploads/${currentImg}`);
    }

    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi cập nhật hồ sơ" });
  }
};
