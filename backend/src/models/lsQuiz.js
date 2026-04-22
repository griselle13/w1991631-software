import mongoose from "mongoose";

const lsQuizSchema = new mongoose.Schema({

    question1: {
        type: String,
        required: true
    },

    question2: {
        type: String,
        required: true
    },

    question3: {
        type: String,
        required: true
    },

    question4: {
        type: String,
        required: true
    },

    question5: {
        type: String,
        required: true
    },

    question6: {
        type: String,
        required: true
    },

    question7: {
        type: String,
        required: true
    },

    question8: {
        type: String,
        required: true
    },

    question9: {
        type: String,
        required: true
    },

    question10: {
        type: String,
        required: true
    },

    question11: {
        type: String,
        required: true
    },

    question12: {
        type: String,
        required: true
    },

    question13: {
        type: String,
        required: true
    },

    question14: {
        type: String,
        required: true
    },

    question15: {
        type: String,
        required: true
    },

    question16: {
        type: String,
        required: true
    },

    question17: {
        type: String,
        required: true
    },

    question18: {
        type: String,
        required: true
    },

    question19: {
        type: String,
        required: true
    },

    question20: {
        type: String,
        required: true
    }

},
    { timestamps: true }
);

const LSQuiz = mongoose.model("LSQuiz", lsQuizSchema);

export default LSQuiz;