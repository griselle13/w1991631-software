import express from "express";
import Cognitive from "../models/Cognitive.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// GET ALL QUESTIONS (USER + ADMIN)
router.get("/", protect, async (req, res) => {
    const questions = await Cognitive.find();
    res.json(questions);
});


// CREATE QUESTION (ADMIN ONLY)
router.post("/", protect, async (req, res) => {
    try {
        console.log("USER:", req.user);
        console.log("BODY:", req.body);

        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "Admins only" });
        }

        const newQuestion = await Cognitive.create({
            type: req.body.type,
            question: req.body.question,
            options: req.body.options,
            answer: req.body.answer,
            createdBy: req.user._id
        });

        console.log("CREATED:", newQuestion);

        res.status(201).json(newQuestion);
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id", protect, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admins only" });
        }

        const updated = await Cognitive.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admins only" });
        }

        await Cognitive.findByIdAndDelete(req.params.id);

        res.json({ message: "Question deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;