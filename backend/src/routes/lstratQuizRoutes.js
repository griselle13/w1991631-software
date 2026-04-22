import express from "express";
import {
    getQuestions,
    createResponse,
    getAllResponses,
    getResponseById,
    updateResponse,
    deleteResponse,
    getVariableAnalytics,
    getOverallResults
} from "../controllers/lstratQuizController.js";

const router = express.Router();

router.get("/", getQuestions);
router.post("/", createResponse);
router.get("/responses", getAllResponses);
router.get("/responses/:id", getResponseById);
router.put("/responses/:id", updateResponse);
router.delete("/responses/:id", deleteResponse);
router.get("/analytics", getVariableAnalytics);
router.get("/results", getOverallResults);


export default router;