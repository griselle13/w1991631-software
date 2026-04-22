import React, { useEffect, useState } from "react";
import axios from "axios";

const Compensation = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";

    const [questions, setQuestions] = useState([]);

    // ADMIN STATES
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [answer, setAnswer] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        question: "",
        options: [],
        answer: ""
    });

    // USER STATES
    const [mcqAnswers, setMcqAnswers] = useState({});
    const [mcqSubmitted, setMcqSubmitted] = useState({});

    // fetch questions
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get("http://localhost:5001/api/compensation", {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            setQuestions(res.data);
        };

        if (user?.token) fetch();
    }, [user?.token]);

    //create 
    const createQuestion = async () => {
        await axios.post(
            "http://localhost:5001/api/compensation",
            { question, options, answer },
            { headers: { Authorization: `Bearer ${user.token}` } }
        );

        const res = await axios.get("http://localhost:5001/api/compensation", {
            headers: { Authorization: `Bearer ${user.token}` },
        });

        setQuestions(res.data);

        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswer("");
    };

    //delete
    const deleteQuestion = async (id) => {
        await axios.delete(`http://localhost:5001/api/compensation/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });

        setQuestions(questions.filter((q) => q._id !== id));
    };

    //edit
    const saveEdit = async (id) => {
        const res = await axios.put(
            `http://localhost:5001/api/compensation/${id}`,
            editData,
            { headers: { Authorization: `Bearer ${user.token}` } }
        );

        setQuestions(questions.map((q) => (q._id === id ? res.data : q)));
        setEditingId(null);
    };

    const submitMCQ = (qId) => {
        setMcqSubmitted({ ...mcqSubmitted, [qId]: true });
    };

    const resetMCQ = (qId) => {
        setMcqAnswers({ ...mcqAnswers, [qId]: null });
        setMcqSubmitted({ ...mcqSubmitted, [qId]: false });
    };

    return (
        <div style={{ maxWidth: 1000, margin: "40px auto" }}>
            <h1>Exapanding your knowledge</h1>

            {isAdmin && (
                <div style={{ padding: 20, border: "1px solid #ccc", marginBottom: 30 }}>
                    <h2>Admin Panel - Add Question</h2>

                    <textarea
                        placeholder="Enter long question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        style={{ width: "100%", height: "100px", marginBottom: "10px" }}
                    />

                    {options.map((opt, i) => (
                        <textarea
                            key={i}
                            placeholder={`Option ${i + 1}`}
                            value={options[i]}
                            onChange={(e) => {
                                const copy = [...options];
                                copy[i] = e.target.value;
                                setOptions(copy);
                            }}
                            style={{ width: "100%", height: "60px", marginBottom: "8px" }}
                        />
                    ))}

                    <textarea
                        placeholder="Correct Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        style={{ width: "100%", height: "60px" }}
                    />

                    <button onClick={createQuestion}>Create Question</button>
                </div>
            )}

            <h2>Questions</h2>

            {questions.length === 0 && <p>No questions yet</p>}

            {questions.map((q) => (
                <div key={q._id} style={{ padding: 15, border: "1px solid #ddd", marginBottom: 20 }}>

                    <p style={{ whiteSpace: "pre-line", fontWeight: "bold" }}>
                        {q.question}
                    </p>

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
                                    padding: 12,
                                    margin: "8px 0",
                                    cursor: "pointer",
                                    background: bg,
                                    whiteSpace: "pre-line"
                                }}
                            >
                                {opt}
                            </div>
                        );
                    })}

                    {!isAdmin && (
                        <div>
                            <button onClick={() => submitMCQ(q._id)}>Submit</button>
                            <button onClick={() => resetMCQ(q._id)}>Reset</button>

                            {mcqSubmitted[q._id] &&
                                mcqAnswers[q._id] !== q.answer && (
                                    <p style={{ color: "red" }}>
                                        Correct Answer: {q.answer}
                                    </p>
                                )}
                        </div>
                    )}

                    {isAdmin && (
                        <div style={{ marginTop: 10 }}>
                            <button
                                onClick={() => {
                                    setEditingId(q._id);
                                    setEditData({
                                        question: q.question,
                                        options: q.options,
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

                    {isAdmin && editingId === q._id && (
                        <div style={{ marginTop: 10, border: "1px solid #aaa", padding: 10 }}>

                            <textarea
                                value={editData.question}
                                onChange={(e) =>
                                    setEditData({ ...editData, question: e.target.value })
                                }
                                style={{ width: "100%", height: "100px" }}
                            />

                            {editData.options.map((opt, i) => (
                                <textarea
                                    key={i}
                                    value={opt}
                                    onChange={(e) => {
                                        const copy = [...editData.options];
                                        copy[i] = e.target.value;
                                        setEditData({ ...editData, options: copy });
                                    }}
                                    style={{ width: "100%", height: "60px" }}
                                />
                            ))}

                            <textarea
                                value={editData.answer}
                                onChange={(e) =>
                                    setEditData({ ...editData, answer: e.target.value })
                                }
                                style={{ width: "100%", height: "60px" }}
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

export default Compensation;