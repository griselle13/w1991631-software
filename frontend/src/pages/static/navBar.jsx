import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const NavBar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 20px",
                backgroundColor: "#0197C0",
                position: "fixed",
                width: "100%",
                top: 0,
                zIndex: 1000,
            }}
        >
            {user && (
                <div style={{ position: "absolute", left: 20, top: 10 }}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            fontSize: "24px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        &#9776;
                    </button>

                    {menuOpen && (
                        <ul
                            style={{
                                position: "absolute",
                                top: "40px",
                                left: 0,
                                background: "#98e1f6",
                                padding: "10px 0",
                                listStyle: "none",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                borderRadius: "6px",
                                minWidth: "220px",
                            }}
                        >
                            {[
                                { label: "HomePage", to: "//home-page" },
                                { label: "View Results", to: "/results" },
                                { label: "Retake Quiz", to: "/quiz-page" },
                                { label: "Access Contact List", to: "/contact-list" },
                                { label: "Memory", to: "/content/1" },
                                { label: "Cognitive", to: "/content/2" },
                                { label: "Compensation", to: "/content/3" },
                                { label: "Metacognitive", to: "/content/4" },
                                { label: "Affective", to: "/content/5" },
                                { label: "Social", to: "/content/6" },
                                { label: "Dashboard", to: "/dashboard" },
                                { label: "View Profile", to: "/profile" },
                            ].map((item, index) => (
                                <li key={index} style={{ padding: "8px 16px" }}>
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            navigate(item.to);
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            width: "100%",
                                            background: "none",
                                            border: "none",
                                            textAlign: "left",
                                            color: "#000",
                                            fontWeight: "normal",
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                            <li style={{ padding: "8px 16px" }}>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        background: "none",
                                        border: "none",
                                        textAlign: "left",
                                        color: "#000",
                                        fontWeight: "normal",
                                    }}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            )}

            <img src={logo} alt="Logo" style={{ height: 40, margin: "0 auto" }} />
        </nav>
    );
};

export default NavBar;