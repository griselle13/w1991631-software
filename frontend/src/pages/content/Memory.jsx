import React, { useEffect, useState } from "react";
import axios from "axios";

const Memory = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [visibility, setVisibility] = useState("private");
    const [editingId, setEditingId] = useState(null);

    const [imageCards, setImageCards] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imageDescription, setImageDescription] = useState("");
    const [imageVisibility, setImageVisibility] = useState("private");
    const [editingImageId, setEditingImageId] = useState(null);

    //  FETCH 
    useEffect(() => {
        fetchFlashcards();
        fetchImages();
    }, []);

    const fetchFlashcards = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/flashcards", {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            setFlashcards(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchImages = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/images", {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            setImageCards(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    //  CREATE FLASHCARD 
    const createFlashcard = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5001/api/flashcards",
                { question, answer, visibility },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );

            setFlashcards([...flashcards, res.data]);
            setQuestion("");
            setAnswer("");
        } catch (err) {
            console.error(err);
        }
    };

    //  CREATE IMAGE 
    const createImageCard = async () => {
        try {
            const formData = new FormData();
            formData.append("image", imageFile); formData.append("description", imageDescription);
            formData.append("visibility", imageVisibility);

            const res = await axios.post(
                "http://localhost:5001/api/images",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setImageCards([...imageCards, res.data]);
            setImageFile(null);
            setImageDescription("");
        } catch (err) {
            console.error(err);
        }
    };

    //  UI 
    return (
        <div style={{ maxWidth: "900px", margin: "50px auto" }}>
            <h1>Memory Flashcards</h1>

            <div style={{ marginBottom: "20px" }}>
                <input
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <input
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />

                <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </select>

                <button onClick={createFlashcard}>Create</button>
            </div>


            <div style={{ display: "grid", gap: "10px" }}>
                {flashcards.map((card) => (
                    <div
                        key={card._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "15px",
                            borderRadius: "8px",
                        }}
                    >
                        <h3>{card.question}</h3>
                        <p>{card.answer}</p>
                    </div>
                ))}
            </div>


            <h1 style={{ marginTop: "40px" }}>Image Association</h1>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />

                <input
                    placeholder="Image description"
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.target.value)}
                />

                <select
                    value={imageVisibility}
                    onChange={(e) => setImageVisibility(e.target.value)}
                >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </select>

                <button onClick={createImageCard}>Create</button>
            </div>

            <div style={{ display: "grid", gap: "15px" }}>
                {imageCards.map((img) => (
                    <div
                        key={img._id}
                        style={{
                            border: "2px solid #3a859a",
                            backgroundColor: "#77bed2",
                            padding: "15px",
                            borderRadius: "8px",
                        }}
                    >
                        {img.imageUrl ? (
                            <img
                                src={`http://localhost:5001/${img.imageUrl}`}
                                alt="uploaded"
                                style={{
                                    width: "100%",
                                    maxHeight: "300px",
                                    objectFit: "contain",
                                }}
                            />
                        ) : (
                            <p>No image available</p>
                        )}

                        <p>{img.description}</p>
                        <small>{img.visibility}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Memory;