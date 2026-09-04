# AI Code Review & Engineering Assistant

An AI-powered code review application that analyzes source code and provides structured engineering feedback.

## Features

- AI-powered code review
- Bug detection
- Bug severity classification
- Detailed issue explanations
- Code improvement recommendations
- Time complexity analysis
- Space complexity analysis
- Improved code generation
- Code quality scoring
- Review history using browser localStorage
- Input validation
- Structured LLM output
- Error handling

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Google Gemini API
- Git / GitHub

## Architecture

```text
Frontend
   ↓
Express REST API
   ↓
Input Validation
   ↓
Gemini LLM
   ↓
Structured JSON Response
   ↓
Frontend Result