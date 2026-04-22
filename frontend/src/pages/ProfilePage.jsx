import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showName, setShowName] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const toggleSection = (section) => {
        setShowName(section === "name");
        setShowEmail(section === "email");
        setShowPassword(section === "password");
    };

    const handleChangeName = async () => {
        try {
            const res = await axios.put(
                "http://localhost:5001/api/auth/update-profile",
                { name: newName },
                {
                    headers: {
                        Authorization: `Bearer ${storedUser?.token}`,
                    },
                }
            );

            setUser(res.data);
            alert("Name updated!");
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangeEmail = async () => {
        try {
            const res = await axios.put(
                "http://localhost:5001/api/auth/update-profile",
                { email: newEmail },
                {
                    headers: {
                        Authorization: `Bearer ${storedUser?.token}`,
                    },
                }
            );

            setUser(res.data);
            alert("Email updated!");
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangePassword = async () => {
        try {
            await axios.put(
                "http://localhost:5001/api/auth/update-password",
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${storedUser?.token}`,
                    },
                }
            );

            alert("Password updated!");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/user/me", {
                    headers: {
                        Authorization: `Bearer ${storedUser?.token}`,
                    },
                });

                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        if (storedUser?.token) {
            fetchUser();
        }
    }, []);

    if (!user) {
        return <h2>Loading profile...</h2>;
    }

    return (
        <div style={{ maxWidth: "500px", margin: "50px auto" }}>
            <h1>Profile</h1>

            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <p>
                <strong>Password:</strong> {"********"}
            </p>

            <div style={{ marginTop: "20px" }}>

                <button onClick={() => toggleSection("name")}>
                    Change Name
                </button>

                {showName && (
                    <div>
                        <input
                            placeholder="New name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <button onClick={handleChangeName}>
                            Save Name
                        </button>
                    </div>
                )}

                <br /><br />

                <button onClick={() => toggleSection("email")}>
                    Change Email
                </button>

                {showEmail && (
                    <div>
                        <input
                            placeholder="New email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button onClick={handleChangeEmail}>
                            Save Email
                        </button>
                    </div>
                )}

                <br /><br />

                <button onClick={() => toggleSection("password")}>
                    Change Password
                </button>

                {showPassword && (
                    <div>
                        <input
                            placeholder="Current password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <input
                            placeholder="New password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <button onClick={handleChangePassword}>
                            Save Password
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProfilePage;