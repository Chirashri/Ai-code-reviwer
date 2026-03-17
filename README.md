# ⚡ AI Code Reviewer

An **AI-powered developer tool** that reviews code, detects bugs, suggests improvements, and explains how the code works.

This project uses AI to help developers **understand and improve their code faster** by providing intelligent feedback and explanations.

---

# 🔗 Live Demo

Primary Deployment:

ai-code-reviewer-omega-five.vercel.app


Additional Deployments:

ai-code-reviewer-git-main-chirashris-projects.vercel.app

ai-code-reviewer-jh9itmxik-chirashris-projects.vercel.app

---

# 🚀 Features

🧠 **AI Code Review**
Automatically analyzes code and suggests improvements, best practices, and potential bugs.

📘 **Code Explanation**
Explains how the code works in simple and beginner-friendly language.

🌐 **Automatic Language Detection**
Detects the programming language of the code snippet.

⚡ **Monaco Code Editor**
Professional editor similar to **VS Code** embedded in the browser.

🟢 **Neon Cyberpunk UI**
Animated background with glowing UI elements for a modern developer experience.

📊 **Code Quality Score**
Provides a score based on detected issues and improvements.

📋 **Copy Review Button**
Easily copy AI suggestions for later use.

---

# 🖥️ Tech Stack

## Frontend

* React.js
* Monaco Editor
* Axios
* React Syntax Highlighter

## Backend

* Node.js
* Express.js

## AI Integration

* OpenRouter API
* Hugging Face models

The backend sends the user’s code to an AI model which analyzes the code and returns:

* Code review
* Code explanation
* Improvement suggestions

---

# ☁️ Deployment

Frontend: **Vercel**

Backend: **Render**

Architecture:

User → Vercel (React Frontend) → Render (Node Backend) → AI Model → Response

---

# 🧠 How It Works

1. User writes or pastes code into the editor.
2. The code is sent to the backend API.
3. The backend sends the code to the AI model through OpenRouter.
4. The AI analyzes the code and returns:

   * Code review
   * Explanation
5. The results are displayed in the UI.

---

# 📂 Project Structure

AI-CodeReviwer

client
├── public
├── src
│   ├── CodeEditor.js
│   ├── App.js
│   └── index.js

server
├── server.js
└── package.json

README.md
.gitignore

---

# ⚙️ Installation

Clone the repository:

git clone https://github.com/Chirashri/Ai-code-reviwer.git

Navigate into the project:

cd Ai-code-reviwer

---

## Install Backend

cd server
npm install
node server.js

---

## Install Frontend

cd client
npm install
npm start

---

# 🔑 Environment Variables

Create a `.env` file inside the **server folder**.

Example:

OPENROUTER_API_KEY=your_api_key_here

---

# 💡 Future Improvements

* AI Code Fix Suggestions
* Security Vulnerability Detection
* GitHub Repository Analysis
* Chat with Code Feature
* AI Code Optimization

---

# 👨‍💻 Author

Chirashri

GitHub:
https://github.com/Chirashri

---

# ⭐ Support

If you like this project, please consider **starring the repository** ⭐
