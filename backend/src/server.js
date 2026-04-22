import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import lstratQuizRoutes from "./routes/lstratQuizRoutes.js";
import authRoutes from "./routes/auth.js";
import quizResultsRoutes from "./routes/quizResults.js";
import userRoutes from "./routes/userRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import cognitiveRoutes from "./routes/cognitiveRoutes.js";
import compensationRoutes from "./routes/compensationRoutes.js";

import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5001;

// CORE MIDDLEWARE 
app.use(cors());
app.use(express.json());

//  STATIC FILES (UPLOADS FIX) 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//  ROUTES 
app.use("/api/quiz", lstratQuizRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/results", quizResultsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/cognitive", cognitiveRoutes);
app.use("/api/compensation", compensationRoutes);
app.use("/uploads", express.static("uploads"));

//  PRODUCTION 
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

//  DB + SERVER 
connectDB()
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });