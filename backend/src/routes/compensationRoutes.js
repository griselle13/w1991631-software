import express from "express";
import Compensation from "../models/Compensation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// GET ALL QUESTIONS
router.get("/", protect, async (req, res) => {
    const questions = await Compensation.find();
    res.json(questions);
});


// CREATE (ADMIN ONLY)
router.post("/", protect, async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admins only" });
    }

    const newQuestion = await Compensation.create({
        question: req.body.question,
        options: req.body.options,
        answer: req.body.answer,
        createdBy: req.user._id,
    });

    res.status(201).json(newQuestion);
});


// UPDATE (ADMIN ONLY)
router.put("/:id", protect, async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admins only" });
    }

    const updated = await Compensation.findByIdAndUpdate(
        req.params.id,
        {
            question: req.body.question,
            options: req.body.options,
            answer: req.body.answer,
        },
        { new: true }
    );

    res.json(updated);
});


// DELETE (ADMIN ONLY) 
router.delete("/:id", protect, async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admins only" });
    }

    await Compensation.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});

export default router;