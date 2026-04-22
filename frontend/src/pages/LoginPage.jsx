import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../lib/axios";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", { email, password });

            const user = res.data;
            localStorage.setItem("user", JSON.stringify(user));

            // CHECK BACKEND (NOT LOCAL STORAGE)
            const check = await api.get(`/results/check/${user._id}`);

            if (check.data.completed) {
                navigate("/home-page");
            } else {
                navigate("/quiz-page");
            }

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto", padding: 20 }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: 10 }}>
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", padding: 8 }}
                    />
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: "100%", padding: 8 }}
                    />
                </div>

                <button type="submit" style={{ padding: "10px 20px" }}>
                    Login
                </button>
            </form>

            <p style={{ marginTop: 15 }}>
                New to the app?{" "}
                <NavLink to="/register" style={{ color: "blue" }}>
                    Register here
                </NavLink>
            </p>
        </div>
    );
};

export default LoginPage;