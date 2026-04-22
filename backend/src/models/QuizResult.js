import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    answers: [{ questionId: String, answer: String }],
    createdAt: { type: Date, default: Date.now }
});

const QuizResult = mongoose.model("QuizResult", quizResultSchema);

export default QuizResult;