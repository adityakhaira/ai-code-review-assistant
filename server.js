const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "AI Code Reviewer backend is running"
    });
});

app.post("/api/review", async (req, res) => {
    try {

        const { code, language } = req.body;

        // Input validation
        if (!code || !language) {
            return res.status(400).json({
                success: false,
                message: "Code and language are required"
            });
        }

        if (code.trim().length < 5) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid code"
            });
        }

       const prompt = `
You are an expert software engineer performing a professional code review.

Analyze the following ${language} code.

Provide a structured engineering review.

For every bug or issue:
- Identify the problem.
- Explain why it is a problem.
- Assign a severity: Critical, High, Medium, or Low.
- Give a clear recommendation.

Also provide:
- General code improvement suggestions.
- Time complexity.
- Space complexity.
- An improved version of the code.
- Overall code quality score from 1 to 10.

Important:
- Do not invent bugs that do not exist.
- If there are no bugs, return an empty bugs array.
- Keep explanations concise and technically accurate.
- Return only valid JSON.
- Do not use markdown outside the JSON.

CODE:

${code}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",

            contents: prompt,

            config: {
                responseMimeType: "application/json",

                responseSchema: {
    type: "object",

    properties: {

        bugs: {
            type: "array",

            items: {
                type: "object",

                properties: {

                    title: {
                        type: "string"
                    },

                    explanation: {
                        type: "string"
                    },

                    severity: {
                        type: "string"
                    },

                    recommendation: {
                        type: "string"
                    }
                },

                required: [
                    "title",
                    "explanation",
                    "severity",
                    "recommendation"
                ]
            }
        },

        suggestions: {
            type: "array",

            items: {
                type: "string"
            }
        },

        timeComplexity: {
            type: "string"
        },

        spaceComplexity: {
            type: "string"
        },

        improvedCode: {
            type: "string"
        },

        score: {
            type: "number"
        }
    },

    required: [
        "bugs",
        "suggestions",
        "timeComplexity",
        "spaceComplexity",
        "improvedCode",
        "score"
    ]
}
              
            }
        });

        const review = JSON.parse(response.text);

        res.json({
            success: true,
            review
        });

    } catch (error) {

        console.error("Review error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to review code using AI"
        });

    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});