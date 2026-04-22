import LSQuiz from "../models/lsQuiz.js";

const questionOptions = {
    question1: {
        text: "When you come across a difficult grammar topic in class, what do you usually do first?",
        options: [
            "I analyse the rules carefully, practise examples, and try to understand the logic behind the structure",
            "I write notes, create flashcards, or repeatedly review the grammar until I can remember it well",
            "I try to continue using the language even if I am unsure, making guesses about the correct form",
            "I plan extra study time and monitor my understanding to make sure I improve",
            "I ask my teacher or classmates for help and explanations",
            "I stay calm, encourage myself, and remind myself that making mistakes is part of learning"
        ]
    },

    question2: {
        text: "If you are reading a long passage in English and don’t understand some words, what do you normally do?",
        options: [
            "I try to understand the main idea by analysing the context and structure of the text",
            "I write down the new words and review them later to remember their meanings",
            "I guess the meaning of the unknown words from the context and continue reading",
            "I check whether my reading method is effective and adjust my approach if needed",
            "I ask someone more proficient to explain the difficult parts to me",
            "I motivate myself to keep reading even if I feel frustrated or confused"
        ]
    },

    question3: {
        text: "When preparing for a language exam, which method best describes your usual behavior?",
        options: [
            "I practise exercises, analyse sample questions, and focus on understanding patterns",
            "I review past lessons, memorize key points, and use repetition to prepare",
            "I think of ways to answer questions even if I don’t fully remember everything",
            "I make a study timetable and evaluate my strengths and weaknesses",
            "I study with friends or ask teachers for extra guidance",
            "I try to reduce my anxiety and encourage myself to feel confident"
        ]
    },

    question4: {
        text: "During a conversation in English, if you forget a word, what do you usually do?",
        options: [
            "I quickly think of similar words or restructure my sentence to express the idea",
            "I try to recall where I learned the word before or remember related vocabulary",
            "I use gestures, descriptions, or simpler language to replace the missing word",
            "I mentally note the problem and plan to learn that word later",
            "I ask the person I am speaking with to help me find the right word",
            "I stay relaxed and do not let the situation make me nervous"
        ]
    },

    question5: {
        text: "When you receive feedback on your language mistakes, how do you normally react?",
        options: [
            "I carefully analyse the corrections and practise to avoid the same mistakes",
            "I write down the corrections and review them later to remember them",
            "I try to continue communicating even if I know I still have weaknesses",
            "I evaluate my errors and plan how to improve in the future",
            "I ask for more explanations and interact with others to practise correctly",
            "I encourage myself and stay positive instead of feeling discouraged"
        ]
    },

    question6: {
        text: "When learning new vocabulary, which approach do you prefer?",
        options: [
            "I practise using the new words in sentences and try to understand how they are used in context",
            "I use flashcards, repetition, or word lists to help me remember the meanings",
            "I try to communicate using other words if I cannot remember the exact vocabulary",
            "I plan regular vocabulary study sessions and monitor how many words I have learned",
            "I ask friends or teachers to explain new words and practise them with me",
            "I motivate myself and reward myself when I successfully learn new vocabulary"
        ]
    },

    question7: {
        text: "If you are asked to write an essay in English, how do you usually begin?",
        options: [
            "I organize my ideas, analyse the topic, and structure my writing logically",
            "I recall useful phrases and examples I have learned before to include in my essay",
            "I find alternative ways to express ideas when I lack the exact words",
            "I plan my time, set goals for writing, and check my progress as I work",
            "I ask someone to review my draft and give me feedback",
            "I try to stay calm and confident even if writing in English feels challenging"
        ]
    },

    question8: {
        text: "When listening to a native speaker and you cannot follow everything, what do you do?",
        options: [
            "I focus on key words and try to understand the overall meaning",
            "I mentally connect what I hear with phrases or patterns I have learned before",
            "I guess the missing information based on context and continue listening",
            "I reflect on my listening skills and plan ways to improve them",
            "I ask the speaker to repeat or explain what they said",
            "I stay relaxed and avoid panicking when I don’t understand everything"
        ]
    },

    question9: {
        text: "If you need to prepare for an important presentation in English, what is your main strategy?",
        options: [
            "I practise repeatedly and analyse how to present my ideas clearly",
            "I memorize key points and rehearse important sentences",
            "I prepare to use simpler language if I forget certain expressions",
            "I plan my preparation schedule and evaluate my performance",
            "I practise in front of others and ask for their feedback",
            "I encourage myself and try to reduce nervousness before presenting"
        ]
    },

    question10: {
        text: "When you feel unmotivated to study a language, what do you usually do?",
        options: [
            "I change my study method and try new learning activities to stay engaged",
            "I review old materials to remind myself of what I have already achieved",
            "I continue studying even if I feel unsure about my ability",
            "I rethink my goals and create a new study plan",
            "I talk to friends or classmates to regain motivation",
            "I focus on positive thinking and encourage myself to keep going"
        ]
    },

    question11: {
        text: "When you are given a new language task by your teacher, how do you usually approach it?",
        options: [
            "I analyse the task requirements and use logical steps to complete it effectively",
            "I try to remember similar tasks I have done before and apply the same methods",
            "I attempt the task even if I do not fully understand everything",
            "I plan how much time and effort the task will need before starting",
            "I discuss the task with classmates or ask the teacher for clarification",
            "I encourage myself to stay confident and not feel overwhelmed"
        ]
    },

    question12: {
        text: "If you notice that your language progress is slow, what is your most likely reaction?",
        options: [
            "I change my study techniques and practise more to improve my skills",
            "I spend more time reviewing previous lessons and materials",
            "I continue using the language in any way possible despite my weaknesses",
            "I evaluate my learning methods and plan better strategies for improvement",
            "I seek help from teachers, tutors, or classmates",
            "I try to stay positive and remind myself that learning takes time"
        ]
    },

    question13: {
        text: "When learning pronunciation, which method do you usually prefer?",
        options: [
            "I analyse the sounds carefully and practise them repeatedly",
            "I listen and repeat many times to help me remember the correct pronunciation",
            "I use similar sounds when I am unsure how to pronounce a word",
            "I monitor my pronunciation progress and set specific goals to improve",
            "I ask native or proficient speakers to correct my pronunciation",
            "I encourage myself and try not to feel embarrassed when I make mistakes"
        ]
    },

    question14: {
        text: "When studying alone at home, what best describes your behavior?",
        options: [
            "I focus on practising exercises and analysing language structures",
            "I review notes and repeat information to help me remember it",
            "I find alternative ways to complete tasks if I lack certain knowledge",
            "I organize my study time and check whether my learning is effective",
            "I contact friends or classmates online to discuss what I am studying",
            "I try to make the learning environment comfortable and stress-free"
        ]
    },

    question15: {
        text: "If you receive a low grade on a language assignment, what do you usually do next?",
        options: [
            "I carefully analyse my mistakes and practise to improve them",
            "I review the corrected work repeatedly to remember the right forms",
            "I focus on doing better next time even if I don’t fully understand everything",
            "I evaluate what went wrong and create a plan to perform better",
            "I ask my teacher or peers for help and advice",
            "I try to stay motivated and not let the result discourage me"
        ]
    },

    question16: {
        text: "When you are learning a new language topic that feels confusing, what is your usual reaction?",
        options: [
            "I break the topic into smaller parts and analyse it step by step",
            "I review the material several times and try to memorize key points",
            "I continue using the language even if I do not fully understand the topic",
            "I rethink my learning approach and plan a better way to study the topic",
            "I ask someone more knowledgeable to explain it to me",
            "I stay patient and remind myself that confusion is normal in learning"
        ]
    },

    question17: {
        text: "If you need to improve your listening skills, what would you most likely do?",
        options: [
            "I practise focused listening and analyse how sentences are structured",
            "I repeatedly listen to recordings to help me remember phrases and expressions",
            "I rely on context and background knowledge when I miss some information",
            "I set specific listening goals and monitor my improvement over time",
            "I engage in conversations with others to practise real-life listening",
            "I try to stay relaxed and confident while listening"
        ]
    },

    question18: {
        text: "When you are asked to work on a group language project, what is your main approach?",
        options: [
            "I focus on organizing the work and analysing the task requirements",
            "I use previous knowledge and materials to contribute to the project",
            "I participate even if my language knowledge is limited",
            "I plan how to manage my role and evaluate my contribution",
            "I cooperate actively with group members and communicate frequently",
            "I keep a positive attitude and encourage myself and others"
        ]
    },

    question19: {
        text: "When you realize you keep making the same language mistake, what do you do?",
        options: [
            "I analyse the mistake carefully and practise the correct form",
            "I write down the correct version and review it until I remember it",
            "I try to avoid situations where that mistake might occur",
            "I monitor my performance and plan strategies to avoid repeating the error",
            "I ask others to point out the mistake whenever they notice it",
            "I stay calm and do not let repeated mistakes reduce my confidence"
        ]
    },

    question20: {
        text: "At the end of a language course, how do you reflect on your learning experience?",
        options: [
            "I think about which learning activities helped me understand the language best",
            "I review all the materials I have learned to reinforce my knowledge",
            "I focus on how I managed to communicate despite my limitations",
            "I evaluate my overall progress and plan how to continue improving",
            "I discuss my learning experience with classmates and teachers",
            "I reflect on my feelings, motivation, and confidence throughout the course"
        ]
    }
};

export async function getOverallResults(req, res) {
    try {
        const responses = await LSQuiz.find();

        const variableTypes = ["Cognitive", "Memory", "Compensation", "Metacognitive", "Social", "Affective"];

        const totals = {};
        variableTypes.forEach(type => (totals[type] = 0));

        responses.forEach(response => {
            Object.keys(response._doc).forEach(key => {
                if (key.startsWith("question")) {
                    const answerIndex = parseInt(response[key]);
                    const typeIndex = answerIndex % variableTypes.length;
                    const type = variableTypes[typeIndex];
                    totals[type] += 1;
                }
            });
        });

        res.status(200).json(totals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to calculate results" });
    }
}

export function getQuestions(req, res) {
    try {
        const questionsArray = Object.keys(questionOptions).map((key, index) => ({
            _id: key,
            question: questionOptions[key].text, // ✅ correct
            options: questionOptions[key].options.map((text, i) => ({
                text,
                value: i
            }))
        }));

        res.status(200).json(questionsArray);
    } catch (error) {
        console.error("Error in getQuestions:", error); // 👈 IMPORTANT
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getVariableAnalytics(req, res) {
    try {
        const responses = await LSQuiz.find();

        const overallCounts = {
            Cognitive: 0,
            Memory: 0,
            Compensation: 0,
            Metacognitive: 0,
            Social: 0,
            Affective: 0
        };

        const perPersonCounts = {};

        responses.forEach(response => {
            const personCounts = { ...overallCounts };

            for (let i = 1; i <= 20; i++) {
                const optionIndex = getOptionIndex(response[`question${i}`], i);
                if (optionIndex !== null && optionIndex >= 0) {
                    const variable = Object.keys(overallCounts)[optionIndex];
                    personCounts[variable]++;
                    overallCounts[variable]++;
                }
            }
            perPersonCounts[response._id] = personCounts;
        });

        res.status(200).json({ perPersonCounts, overallCounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getAllResponses(_, res) {
    try {
        const responses = await LSQuiz.find().sort({ createdAt: -1 });
        res.status(200).json(responses);
    } catch (error) {
        console.error("Error in getAllResponses controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getResponseById(req, res) {
    try {
        const response = await LSQuiz.findById(req.params.id);
        if (!response) return res.status(404).json({ message: "Response not found!" });
        res.json(response);
    } catch (error) {
        console.error("Error in getResponseById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createResponse(req, res) {
    try {
        console.log("Received:", req.body);
        const response = new LSQuiz(req.body);
        const savedResponse = await response.save();
        res.status(201).json(savedResponse);
    } catch (error) {
        console.error("Error in createResponse controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateResponse(req, res) {
    try {
        const updatedResponse = await LSQuiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedResponse) return res.status(404).json({ message: "Response not found" });

        res.status(200).json(updatedResponse);
    } catch (error) {
        console.error("Error in updateResponse controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteResponse(req, res) {
    try {
        const deletedResponse = await LSQuiz.findByIdAndDelete(req.params.id);
        if (!deletedResponse) return res.status(404).json({ message: "Response not found" });

        res.status(200).json({ message: "Response deleted successfully" });
    } catch (error) {
        console.error("Error in deleteResponse controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}