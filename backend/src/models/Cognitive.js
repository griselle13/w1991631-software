import mongoose from "mongoose";

const cognitiveSchema = new mongoose.Schema({
    type: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [String], default: [] },
    answer: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Cognitive", cognitiveSchema);