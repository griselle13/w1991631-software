import React from "react";

// MEMORY
import memoryBronze from "../assets/badges/memory/memory-bronze.png";
import memorySilver from "../assets/badges/memory/memory-silver.png";
import memoryGold from "../assets/badges/memory/memory-gold.png";
import memoryPlatinum from "../assets/badges/memory/memory-platinum.png";
import memoryDiamond from "../assets/badges/memory/memory-diamond.png";
import memoryEmerald from "../assets/badges/memory/memory-emerald.png";

// COGNITIVE
import cognitiveBronze from "../assets/badges/cognitive/cognitive-bronze.png";
import cognitiveSilver from "../assets/badges/cognitive/cognitive-silver.png";
import cognitiveGold from "../assets/badges/cognitive/cognitive-gold.png";
import cognitivePlatinum from "../assets/badges/cognitive/cognitive-platinum.png";
import cognitiveDiamond from "../assets/badges/cognitive/cognitive-diamond.png";
import cognitiveEmerald from "../assets/badges/cognitive/cognitive-emerald.png";

// COMPENSATION
import compensationBronze from "../assets/badges/compensation/Compensation-bronze.png";
import compensationSilver from "../assets/badges/compensation/Compensation-silver.png";
import compensationGold from "../assets/badges/compensation/Compensation-gold.png";
import compensationPlatinum from "../assets/badges/compensation/Compensation-platinum.png";
import compensationDiamond from "../assets/badges/compensation/Compensation-diamond.png";
import compensationEmerald from "../assets/badges/compensation/Compensation-emerald.png";

// METACOGNITIVE
import metaBronze from "../assets/badges/metacognitive/Metacognitive-bronze.png";
import metaSilver from "../assets/badges/metacognitive/Metacognitive-silver.png";
import metaGold from "../assets/badges/metacognitive/Metacognitive-gold.png";
import metaPlatinum from "../assets/badges/metacognitive/Metacognitive-platinum.png";
import metaDiamond from "../assets/badges/metacognitive/Metacognitive-diamond.png";
import metaEmerald from "../assets/badges/metacognitive/Metacognitive-emerald.png";

// AFFECTIVE
import affectiveBronze from "../assets/badges/affective/Affective-bronze.png";
import affectiveSilver from "../assets/badges/affective/Affective-silver.png";
import affectiveGold from "../assets/badges/affective/Affective-gold.png";
import affectivePlatinum from "../assets/badges/affective/Affective-platinum.png";
import affectiveDiamond from "../assets/badges/affective/Affective-diamond.png";
import affectiveEmerald from "../assets/badges/affective/Affective-emerald.png";

// SOCIAL
import socialBronze from "../assets/badges/social/Social-bronze.png";
import socialSilver from "../assets/badges/social/Social-silver.png";
import socialGold from "../assets/badges/social/Social-gold.png";
import socialPlatinum from "../assets/badges/social/Social-platinum.png";
import socialDiamond from "../assets/badges/social/Social-diamond.png";
import socialEmerald from "../assets/badges/social/Social-emerald.png";

//  DATA STRUCTURE 

const badgeData = [
    {
        title: "Memory",
        badges: [memoryBronze, memorySilver, memoryGold, memoryPlatinum, memoryDiamond, memoryEmerald]
    },
    {
        title: "Cognitive",
        badges: [cognitiveBronze, cognitiveSilver, cognitiveGold, cognitivePlatinum, cognitiveDiamond, cognitiveEmerald]
    },
    {
        title: "Compensation",
        badges: [compensationBronze, compensationSilver, compensationGold, compensationPlatinum, compensationDiamond, compensationEmerald]
    },
    {
        title: "Metacognitive",
        badges: [metaBronze, metaSilver, metaGold, metaPlatinum, metaDiamond, metaEmerald]
    },
    {
        title: "Affective",
        badges: [affectiveBronze, affectiveSilver, affectiveGold, affectivePlatinum, affectiveDiamond, affectiveEmerald]
    },
    {
        title: "Social",
        badges: [socialBronze, socialSilver, socialGold, socialPlatinum, socialDiamond, socialEmerald]
    }
];

//  COMPONENT 

const Dashboard = () => {
    return (
        <div style={{ padding: "40px" }}>
            <h1 style={{ textAlign: "center" }}>Learning Dashboard</h1>

            {badgeData.map((section, index) => (
                <div key={index} style={{ marginBottom: "40px" }}>

                    <h2>{section.title}</h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                            gap: "20px",
                            marginTop: "20px"
                        }}
                    >
                        {section.badges.map((badge, i) => (
                            <div
                                key={i}
                                style={{
                                    border: "1px",
                                    borderRadius: "12px",
                                    padding: "10px",
                                    textAlign: "center"
                                }}
                            >
                                <img
                                    src={badge}
                                    alt="badge"
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;