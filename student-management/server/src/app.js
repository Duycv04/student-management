import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/studentRoutes.js";
import path from 'path';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/students", studentRoutes);
app.use("/api/profile", studentRoutes);


export default app;
