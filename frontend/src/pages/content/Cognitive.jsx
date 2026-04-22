import React, { useEffect, useState } from "react";
import axios from "axios";

const Cognitive = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";

    const [questions, setQuestions] = useState([]);

    //  ADMIN STATES 
    const [type, setType] = useState("mcq");
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [answer, setAnswer] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        question: "",
        options: [],
        answer: ""
    });

    //  USER STATES 
    const [mcqAnswers, setMcqAnswers] = useState({});
    const [mcqSubmitted, setMcqSubmitted] = useState({});

    const [fillAnswers, setFillAnswers] = useState({});
    const [fillSubmitted, setFillSubmitted] = useState({});
    const [fillResults, setFillResults] = useState({});

    //  FETCH QUESTIONS 
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get("http://localhost:5001/api/cognitive", {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            setQuestions(res.data);
        };

        if (user?.token) fetch();
    }, [user?.token]);

    //  CREATE QUESTION 
    const createQuestion = async () => {
        await axios.post(
            "http://localhost:5001/api/cognitive",
            { type, question, options, answer },
            { headers: { Authorization: `Bearer ${user.token}` } }
        );

        const res = await axios.get("http://localhost:5001/api/cognitive", {
            headers: { Authorization: `Bearer ${user.token}` },
        });

        setQuestions(res.data);

        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswer("");
    };

    //  DELETE 
    const deleteQuestion = async (id) => {
        await axios.delete(`http://localhost:5001/api/cognitive/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });

        setQuestions(questions.filter((q) => q._id !== id));
    };

    //  SAVE EDIT 
    const saveEdit = async (id) => {
        const res = await axios.put(
            `http://localhost:5001/api/cognitive/${id}`,
            editData,
            { headers: { Authorization: `Bearer ${user.token}` } }
        );

        setQuestions(questions.map((q) => (q._id === id ? res.data : q)));
        setEditingId(null);
    };

    //  USER ACTIONS 

    const submitMCQ = (qId) => {
        setMcqSubmitted({ ...mcqSubmitted, [qId]: true });
    };

    const resetMCQ = (qId) => {
        setMcqAnswers({ ...mcqAnswers, [qId]: null });
        setMcqSubmitted({ ...mcqSubmitted, [qId]: false });
    };

    const submitFill = (q) => {
        const userAns = (fillAnswers[q._id] || "").trim().toLowerCase();
        const correct = q.answer.trim().toLowerCase();

        setFillSubmitted({ ...fillSubmitted, [q._id]: true });
        setFillResults({
            ...fillResults,
            [q._id]: userAns === correct
        });
    };

    const resetFill = (qId) => {
        setFillAnswers({ ...fillAnswers, [qId]: "" });
        setFillSubmitted({ ...fillSubmitted, [qId]: false });
        setFillResults({ ...fillResults, [qId]: null });
    };

    return (
        <div style={{ maxWidth: 900, margin: "40px auto" }}>
            <h1>Cognitive Practice</h1>
// ADMIN PANEL
            {isAdmin && (
                <div style={{ padding: 20, border: "1px solid #ccc" }}>
                    <h2>Admin Panel - Add Question</h2>

                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="mcq">Multiple Choice</option>
                        <option value="fill">Fill in the blank</option>
                    </select>

                    <input
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />

                    {type === "mcq" &&
                        options.map((opt, i) => (
                            <input
                                key={i}
                                placeholder={`Option ${i + 1}`}
                                value={options[i]}
                                onChange={(e) => {
                                    const copy = [...options];
                                    copy[i] = e.target.value;
                                    setOptions(copy);
                                }}
                            />
                        ))}

                    <input
                        placeholder="Correct Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />

                    <button onClick={createQuestion}>Create Question</button>
                </div>
            )}

// QUESTIONS LIST
            <h2>Questions</h2>

            {questions.length === 0 && <p>No questions yet</p>}

            {questions.map((q) => (
                <div key={q._id} style={{ padding: 10, border: "1px solid #ddd", marginBottom: 15 }}>
                    <h3>{q.question}</h3>

//mcq
                    {q.type === "mcq" && (
                        <>
                            {q.options.map((opt, i) => {
                                const chosen = mcqAnswers[q._id];
                                const submitted = mcqSubmitted[q._id];

                                let bg = "#eee";

                                if (!submitted && chosen === opt) bg = "orange";
                                if (submitted) {
                                    if (opt === q.answer) bg = "green";
                                    else if (chosen === opt && opt !== q.answer) bg = "red";
                                }

                                return (
                                    <div
                                        key={i}
                                        onClick={() =>
                                            setMcqAnswers({ ...mcqAnswers, [q._id]: opt })
                                        }
                                        style={{
                                            padding: 8,
                                            margin: 5,
                                            cursor: "pointer",
                                            background: bg,
                                        }}
                                    >
                                        {opt}
                                    </div>
                                );
                            })}

//User only buttons
                            {!isAdmin && (
                                <div style={{ marginTop: 10 }}>
                                    <button onClick={() => submitMCQ(q._id)}>
                                        Submit
                                    </button>
                                    <button onClick={() => resetMCQ(q._id)}>
                                        Reset
                                    </button>

                                    {mcqSubmitted[q._id] &&
                                        mcqAnswers[q._id] !== q.answer && (
                                            <p style={{ color: "red" }}>
                                                Correct Answer: {q.answer}
                                            </p>
                                        )}
                                </div>
                            )}
                        </>
                    )}

//fill in the blank
                    {q.type === "fill" && (
                        <>
                            <input
                                value={fillAnswers[q._id] || ""}
                                onChange={(e) =>
                                    setFillAnswers({
                                        ...fillAnswers,
                                        [q._id]: e.target.value,
                                    })
                                }
                            />

                            {!isAdmin && (
                                <div>
                                    <button onClick={() => submitFill(q)}>
                                        Submit
                                    </button>
                                    <button onClick={() => resetFill(q._id)}>
                                        Reset
                                    </button>

                                    {fillSubmitted[q._id] && (
                                        <p style={{ color: fillResults[q._id] ? "green" : "red" }}>
                                            {fillResults[q._id]
                                                ? "Correct!"
                                                : `Correct Answer: ${q.answer}`}
                                        </p>
                                    )}
                                </div>
                            )}
                        </>
                    )}

// ADMIN EDIT/DELETE
                    {isAdmin && (
                        <div style={{ marginTop: 10 }}>
                            <button
                                onClick={() => {
                                    setEditingId(q._id);
                                    setEditData({
                                        question: q.question,
                                        options: q.options || [],
                                        answer: q.answer
                                    });
                                }}
                            >
                                Edit
                            </button>

                            <button onClick={() => deleteQuestion(q._id)}>
                                Delete
                            </button>
                        </div>
                    )}

// ADMIN EDIT FORM
                    {isAdmin && editingId === q._id && (
                        <div style={{ marginTop: 10, padding: 10, border: "1px solid #aaa" }}>
                            <input
                                value={editData.question}
                                onChange={(e) =>
                                    setEditData({ ...editData, question: e.target.value })
                                }
                            />

                            {q.type === "mcq" &&
                                editData.options.map((opt, i) => (
                                    <input
                                        key={i}
                                        value={opt}
                                        onChange={(e) => {
                                            const copy = [...editData.options];
                                            copy[i] = e.target.value;
                                            setEditData({ ...editData, options: copy });
                                        }}
                                    />
                                ))}

                            <input
                                value={editData.answer}
                                onChange={(e) =>
                                    setEditData({ ...editData, answer: e.target.value })
                                }
                            />

                            <button onClick={() => saveEdit(q._id)}>Save</button>
                            <button onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Cognitive;