import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();
const JWT_SECRET = "your_secret_key"; // nên dùng biến môi trường

// Register account
router.post("/register", async (req, res) => {
  const {
    username,
    password,
    role = "student",
    linked_student_id = null,
    linked_teacher_id = null,
    email,
  } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
  }
  try {
    const existing = await pool.query(
      "SELECT id FROM taikhoan WHERE username = $1",
      [username]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO taikhoan (
        username, password, role,
        linked_student_id, linked_teacher_id,
        email, created_at
      ) VALUES (
        $1, $2, $3,
        $4, $5,
        $6, CURRENT_TIMESTAMP
      )`,
      [
        username,
        hashedPassword,
        role,
        linked_student_id,
        linked_teacher_id,
        email,
      ]
    );
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    console.error("Lỗi đăng ký:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});
// Login account
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const result = await pool.query(
      "SELECT id, username, password, role, linked_student_id, linked_teacher_id, email FROM taikhoan WHERE username = $1",
      [username]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }
    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Return token and user info
    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        linked_student_id: user.linked_student_id,
        linked_teacher_id: user.linked_teacher_id,
      },
    });
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});
export default router;
