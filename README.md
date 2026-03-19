# ⚡ AI Code Reviewer  

An **AI-powered developer assistant** that analyzes code, identifies issues, suggests improvements, and explains logic in a clear and beginner-friendly way.  

Designed to help developers **write cleaner, more efficient code faster** using intelligent AI insights.

---

## 🔗 Live Demo  

🌍 **Primary Deployment**  
https://ai-code-reviewer-omega-five.vercel.app  

🚀 **Other Deployments**  
https://ai-code-reviewer-git-main-chirashris-projects.vercel.app  
https://ai-code-reviewer-jh9itmxik-chirashris-projects.vercel.app  

---

## ✨ Features  

🔍 **AI Code Review**  
Analyzes code and provides suggestions, best practices, and bug detection.  

📘 **Code Explanation**  
Explains code in simple and easy-to-understand language.  

🌐 **Automatic Language Detection**  
Detects the programming language of the code.  

⚡ **Monaco Editor Integration**  
VS Code–like editor inside the browser.  

🎨 **Modern Responsive UI**  
Neon-themed UI with animations and mobile-friendly design.  

📊 **Code Quality Score**  
Gives a score based on detected improvements.  

📋 **Copy Button**  
Quickly copy AI-generated suggestions.  

---

## 🛠️ Tech Stack  

### Frontend  
- React.js  
- Monaco Editor  
- Axios  
- React Syntax Highlighter  

### Backend  
- Node.js  
- Express.js  

### AI Integration  
- OpenRouter API  
- Hugging Face Models  

---

## ☁️ Deployment  

- Frontend: Vercel  
- Backend: Render  

### Architecture  

User → React Frontend → Node Backend → AI Model → Response  

---

## 🧠 How It Works  

1. User writes or pastes code  
2. Code is sent to backend  
3. Backend sends code to AI model  
4. AI returns:  
   - Code review  
   - Explanation  
   - Suggestions  
5. Results are displayed in UI  

---

## 📁 Project Structure  

AI-Code-Reviewer  
│  
├── client  
│   ├── public  
│   └── src  
│       ├── CodeEditor.js  
│       ├── App.js  
│       └── index.js  
│  
├── server  
│   ├── server.js  
│   └── package.json  
│  
├── README.md  
└── .gitignore  

---

## ⚙️ Installation  

### Clone the repository  

git clone {https://github.com/Chirashri/Ai-code-reviewer.git}

cd Ai-code-reviewer


---

### Backend Setup  

cd server
npm install
node server.js


---

### Frontend Setup  

cd client
npm install
npm start


---

## 🔑 Environment Variables  

Create a `.env` file inside the `server` folder:  

OPENROUTER_API_KEY=your_api_key_here

HG_TOKEN=your_huggingface_token_here


---

## 🚀 Future Improvements  

- AI Auto Code Fixing  
- Security Vulnerability Detection  
- GitHub Repository Analysis  
- Chat with Code Feature  
- Code Optimization Suggestions  

---

## 👩‍💻 Author  

Chirashri  
https://github.com/Chirashri  

---

## ⭐ Support  

If you like this project, please give it a ⭐ on GitHub!

