import mongoose from "mongoose";

const compensationSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },

        options: {
            type: [String],
            required: true,
        },

        answer: {
            type: String,
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Compensation", compensationSchema);