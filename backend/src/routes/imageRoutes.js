import express from "express";
import multer from "multer";
import ImageCard from "../models/ImageCard.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// MULTER 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// CREATE IMAGE 
router.post("/", protect, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const newImage = await ImageCard.create({
            imageUrl: req.file.path.replace(/\\/g, "/"),
            description: req.body.description,
            visibility: req.body.visibility,
            createdBy: req.user._id,
        });

        res.status(201).json(newImage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET IMAGES 
router.get("/", protect, async (req, res) => {
    const images = await ImageCard.find().populate("createdBy", "name");
    res.json(images);
});

export default router;