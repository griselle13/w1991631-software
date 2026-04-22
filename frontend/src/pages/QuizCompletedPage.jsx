import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const QuizCompletedPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const quizAnswers = location.state?.quizAnswers;

    const handleViewResults = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            localStorage.setItem(`quizCompleted_${user._id}`, "true");
        }

        if (user && quizAnswers) {
            localStorage.setItem(
                `quizResults_${user._id}`,
                JSON.stringify(quizAnswers)
            );
        }

        navigate("/results");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Quiz Completed Successfully!</h1>
            <button
                onClick={handleViewResults}
                style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
            >
                View Results
            </button>
        </div>
    );
};

export default QuizCompletedPage;