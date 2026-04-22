import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    // Redirect to login if not logged in
    useEffect(() => {
        if (!user || !user.token) {
            navigate("/");
        }
    }, [user, navigate]);

    // Fetch quiz questions securely
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!user || !user.token) return;

            try {
                const res = await axios.get("http://localhost:5001/api/quiz", {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setQuestions(res.data);
            } catch (err) {
                console.error("Error fetching questions:", err);
                toast.error("Failed to load questions");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [user]);

    const handleChange = (questionId, value) => {
        setAnswers((prev) => {
            const newAnswers = { ...prev, [questionId]: value };
            return newAnswers;
        });
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length < questions.length) {
            toast.error("All questions are required!");
            return;
        }

        try {
            const formattedAnswers = Object.entries(answers).map(
                ([questionId, answer]) => ({
                    questionId,
                    answer
                })
            );

            if (user && user.token) {
                await axios.post(
                    "http://localhost:5001/api/results",
                    {
                        answers: formattedAnswers,
                        score: formattedAnswers.length,
                        totalQuestions: questions.length
                    },
                    {
                        headers: { Authorization: `Bearer ${user.token}` }
                    }
                );
            }

            navigate("/quiz-completed", { state: { quizAnswers: answers } });
        } catch (err) {
            console.error("Submit error:", err.response || err);
            toast.error("Error submitting quiz");
        }
    };

    if (loading) return <h2>Loading questions...</h2>;

    return (
        <div style={{ padding: "20px" }}>
            <Toaster />
            <h1>Quiz</h1>

            {questions.map((q, idx) => (
                <div key={q._id} style={{ marginBottom: "20px" }}>
                    <h3>
                        {idx + 1}. {q.question}
                    </h3>

                    {q.options.map((opt, i) => (
                        <div key={i}>
                            <input
                                type="radio"
                                name={q._id}
                                value={i}
                                checked={answers[q._id] === i}
                                onChange={() => handleChange(q._id, i)}
                            />
                            <label style={{ marginLeft: "5px" }}>{opt.text}</label>
                        </div>
                    ))}
                </div>
            ))}

            <button
                onClick={handleSubmit}
                style={{ marginTop: "20px", padding: "10px 20px" }}
            >
                Submit Quiz
            </button>
        </div>
    );
};

export default QuizPage;