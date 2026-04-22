import express from "express";
import QuizResult from "../models/QuizResult.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's quiz results
router.get("/", protect, async (req, res) => {
    try {
        const results = await QuizResult.find({ user: req.user._id });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add a new result
router.post("/", protect, async (req, res) => {
    try {
        const { score, totalQuestions, answers } = req.body;

        const result = await QuizResult.create({
            user: req.user._id,
            score,
            totalQuestions,
            answers,
        });

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/check/:userId", async (req, res) => {
    try {
        const results = await QuizResult.find({ user: req.params.userId });

        if (results.length > 0) {
            return res.json({ completed: true });
        }

        return res.json({ completed: false });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/me", protect, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});

export default router;