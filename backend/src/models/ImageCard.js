import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
    {
        imageUrl: String,
        description: String,
        visibility: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const ImageCard = mongoose.model("ImageCard", imageSchema);

export default ImageCard;