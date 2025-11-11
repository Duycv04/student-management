// import express, { Router } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import pool from '../db.js';
// import e from 'express';
// Router.post('/login', async (req, res) => {
//     const {username, password} = req.body;
//     try {
//         const userResult = await pool.query('SELECT * FROM TaiKhoan WHERE username = $1', [username]);
//         const user = userResult.rows[0];

//         if (!user) return res.status(401).json({ message: 'user not found' });
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ message: 'invalid credentials' });

//         const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'server error' });
//     }   
// });

// export default Router;
