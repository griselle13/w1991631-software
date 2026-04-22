import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../lib/axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            alert("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Send all required fields to backend
            await api.post("/auth/register", { name, email, password, confirmPassword });
            alert("Registration successful! Please login.");
            // redirect to login page after registration
            navigate("/");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto", padding: 20 }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: 10 }}>
                    <label>Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: "100%", padding: 8 }}
                    />
                </div>

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

                <div style={{ marginBottom: 10 }}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: "100%", padding: 8 }}
                    />
                </div>

                <button type="submit" style={{ padding: "10px 20px" }}>
                    Register
                </button>
            </form>

            <p style={{ marginTop: 15 }}>
                Already registered?{" "}
                <NavLink to="/" style={{ color: "blue" }}>
                    Login here
                </NavLink>
            </p>
        </div>
    );
};

export default RegisterPage;