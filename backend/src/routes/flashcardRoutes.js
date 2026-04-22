import express from "express";
import Flashcard from "../models/Flashcard.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);


// CREATE flashcard
router.post("/", protect, async (req, res) => {
    try {
        const flashcard = await Flashcard.create({
            question: req.body.question,
            answer: req.body.answer,
            isPublic: req.body.isPublic,
            createdBy: req.user._id
        });

        res.status(201).json(flashcard);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// GET all flashcards (public + own private)
router.get("/", protect, async (req, res) => {
    try {
        const cards = await Flashcard.find({
            $or: [
                { visibility: "public" },
                { createdBy: req.user._id },
            ],
        }).populate("createdBy", "name");

        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// UPDATE (only owner + private)
router.put("/:id", protect, async (req, res) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);

        if (!flashcard) {
            return res.status(404).json({ message: "Flashcard not found" });
        }

        // OWNERSHIP CHECK
        if (flashcard.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        flashcard.question = req.body.question || flashcard.question;
        flashcard.answer = req.body.answer || flashcard.answer;
        flashcard.isPublic = req.body.isPublic ?? flashcard.isPublic;

        const updated = await flashcard.save();

        res.json(updated);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// DELETE (only owner + private)
router.delete("/:id", protect, async (req, res) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);

        if (!flashcard) {
            return res.status(404).json({ message: "Flashcard not found" });
        }

        // OWNERSHIP CHECK 
        if (flashcard.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await flashcard.deleteOne();

        res.json({ message: "Flashcard deleted" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;