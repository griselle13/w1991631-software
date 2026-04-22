import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const hasCompletedQuiz = localStorage.getItem(`quizCompleted_${user?._id}`);

    const handleStart = () => {
        if (hasCompletedQuiz) {
            navigate("/results");
        } else {
            navigate("/quiz-page");
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
            <h1>What are learning strategies?</h1>
            <p>
                A generic definition of a learning strategy is the specific actions,
                behaviours, steps or techniques that students use to improve their
                progress in developing skills or learning. These strategies help with
                internalisation, storage, and retrieval of knowledge.
            </p>

            <h2>Oxford Learning Strategies</h2>
            <p>
                Oxford divides learning strategies into direct and indirect strategies.
                Direct includes memory, cognitive, and compensation strategies. Indirect
                includes metacognitive, affective, and social strategies.
            </p>

            <h3>How does the quiz work?</h3>
            <p>
                The quiz asks a series of questions and determines which learning strategy
                best suits you based on your answers.
            </p>

            <h3>Time to answer the quiz</h3>
            <p>Approx 5–7 minutes</p>

            <h3>Why Enzylearning?</h3>
            <p>
                Learner-focused platform designed to help users understand their learning
                strategies and improve learning efficiency.
            </p>

            <button
                onClick={handleStart}
                style={{
                    padding: "10px 20px",
                    marginTop: "20px",
                    backgroundColor: "#1a5463",
                    color: "white",
                    border: "none",
                    borderRadius: "25px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                {hasCompletedQuiz ? "View Results" : "Start Quiz"}
            </button>
        </div>
    );
};

export default HomePage;