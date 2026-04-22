import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        visibility: {
            type: String,
            enum: ["public", "private"],
            default: "private",
        },
    },
    { timestamps: true }
);

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;