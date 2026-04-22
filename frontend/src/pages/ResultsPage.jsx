import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF4081"];
const variableTypes = ["Cognitive", "Memory", "Compensation", "Metacognitive", "Social", "Affective"];

const ResultsPage = () => {
    const [chartData, setChartData] = useState([]);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
    const [userResults, setUserResults] = useState({});
    useEffect(() => {
        if (!user || !user.token) return;

        const fetchResults = async () => {
            try {
                // Fetch user-specific results from backend
                const res = await axios.get("http://localhost:5001/api/results", {
                    headers: { Authorization: `Bearer ${user.token}` },
                });

                const latestResult = res.data[res.data.length - 1];
                console.log("LATEST RESULT:", latestResult);
                const answersArray = latestResult?.answers;

                console.log("ANSWERS ARRAY:", answersArray);
                console.log("USER RESULTS:", userResults);
                console.log("TOTAL ANSWERS:", Object.keys(userResults).length);

                if (!Array.isArray(answersArray)) {
                    console.log("Answers is not array:", answersArray);
                    setChartData([]);
                    return;
                }

                const tempResults = {};

                answersArray.forEach((item) => {
                    tempResults[item.questionId] = item.answer;
                });

                setUserResults(tempResults);
                answersArray.forEach((item) => {
                    userResults[item.questionId] = item.answer;
                }); console.log("USER RESULTS RAW:", userResults);
                if (!userResults || Object.keys(userResults).length === 0) {
                    setChartData([]);
                    return;
                }

                // Transform results for chart
                const totals = {
                    Cognitive: 0,
                    Memory: 0,
                    Compensation: 0,
                    Metacognitive: 0,
                    Social: 0,
                    Affective: 0,
                };

                Object.keys(userResults).forEach((questionId) => {
                    const answerIndex = parseInt(userResults[questionId]);

                    if (isNaN(answerIndex)) return;

                    // clamp index to valid range
                    const typeIndex = Math.min(
                        Math.max(answerIndex, 0),
                        variableTypes.length - 1
                    );

                    const type = variableTypes[typeIndex];

                    if (totals[type] !== undefined) {
                        totals[type] += 1;
                    }
                });

                const formattedData = Object.keys(totals)
                    .map((key, index) => ({
                        name: key,
                        value: totals[key],
                        color: COLORS[index % COLORS.length],
                    }))
                    .sort((a, b) => b.value - a.value);

                const totalCount = Object.values(totals).reduce((sum, val) => sum + val, 0);
                formattedData.forEach((item) => {
                    item.percent = totalCount ? ((item.value / totalCount) * 100).toFixed(1) + "%" : "0%";
                });

                setChartData(formattedData);
            } catch (err) {
                console.error("Failed to fetch results:", err);
                setChartData([]);
            }
        };

        fetchResults();
    }, [user?.token]);
    if (!user) {
        return (
            <div style={{ width: "100%", maxWidth: 600, margin: "50px auto", textAlign: "center" }}>
                <h2>Your Quiz Results</h2>
                <p>Please login to view your results.</p>
            </div>
        );
    }

    if (!chartData.length) {
        return (
            <div>
                <h2>No chart data</h2>
                <pre>{JSON.stringify(userResults, null, 2)}</pre>
            </div>
        );
    }

    return (
        <div style={{ width: "100%", maxWidth: 600, margin: "20px auto" }}>
            <h1 style={{ textAlign: "center" }}>Your Quiz Results</h1>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [`${value}`, `${props.payload.name}`]} />
                </PieChart>
            </ResponsiveContainer>

            <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
                {chartData.map((item) => (
                    <li
                        key={item.name}
                        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                backgroundColor: item.color,
                                marginRight: "8px",
                                borderRadius: "4px",
                            }}
                        ></span>
                        <span style={{ flex: 1 }}>{item.name}</span>
                        <span>{item.percent}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultsPage;