# 🤖 AI Code Review & Engineering Assistant

An AI-powered code review application that analyzes source code and provides structured engineering feedback using the Google Gemini API.

The application helps developers identify potential bugs, understand code quality issues, analyze complexity, and receive actionable improvement suggestions.

## 🚀 Live Demo

👉 **[Try the AI Code Reviewer](https://ai-code-review-assistant-b0hx.onrender.com/)**

> Replace `YOUR_RENDER_URL` with your deployed Render URL.

## 📂 GitHub Repository

👉 **[View Source Code](https://github.com/adityakhaira/ai-code-review-assistant)**

---

## ✨ Features

- 🔍 AI-powered source code review
- 🐛 Potential bug detection
- 🚨 Bug severity classification
- 💡 Detailed issue explanations
- 🛠️ Code improvement recommendations
- ⏱️ Time complexity analysis
- 💾 Space complexity analysis
- ✨ Improved code generation
- 📊 Code quality scoring
- 📝 Local review history
- ✅ Backend input validation
- 🔐 Secure API key management
- 📦 Structured JSON AI responses
- ⚠️ Error handling for failed AI requests
- 📱 Responsive web interface

---

## 🧠 What the Application Analyzes

For submitted code, the AI reviewer provides:

### Potential Bugs

Identifies possible issues and provides:

- Bug title
- Severity
- Explanation
- Recommendation

### Code Quality

Provides an overall quality score from **1–10**.

### Complexity Analysis

Provides:

- Time complexity
- Space complexity

### Improved Code

Generates an improved version of the submitted code when appropriate.

### Engineering Suggestions

Provides practical recommendations for improving readability, maintainability, and implementation quality.

---

## 🏗️ Architecture

```text
┌─────────────────────────┐
│       Frontend          │
│   HTML / CSS / JS       │
└────────────┬────────────┘
             │
             │ HTTP POST
             ▼
┌─────────────────────────┐
│     Express REST API    │
│       Node.js           │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│    Input Validation     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Prompt Engineering    │
│ Structured AI Request   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│     Google Gemini       │
│          LLM            │
└────────────┬────────────┘
             │
             │ Structured JSON
             ▼
┌─────────────────────────┐
│  Response Parsing &     │
│      Validation         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Review Results UI     │
└─────────────────────────┘