# 🧠 AI Resume Skill Extractor & Job Matcher

A full-stack web application that lets users upload their resume (PDF), extracts relevant skills using basic NLP techniques, and matches them with job listings stored in a PostgreSQL database.

---

## 🚀 Features

- 📄 Upload resume (PDF)
- 🧠 Extract skills using keyword match
- 🔍 Match with job listings from PostgreSQL
- 📊 Score jobs based on skill overlap
- 🎨 Beautiful UI with Tailwind CSS
- 📡 Built with React (frontend) + Node.js/Express (backend)

## 🛠️ Tech Stack

| Layer     | Tech                             |
|-----------|----------------------------------|
| Frontend  | React, Axios, Tailwind CSS        |
| Backend   | Node.js, Express.js, pdf-parse    |
| Database  | PostgreSQL (hosted on Neon, Render, or local) |
| Icons/UI  | lucide-react                      |


📦 1. Backend Setup
- cd server
- npm install
- Create .env:
  - PG_URI=your_postgres_connection_string
- Run the server:
  - node index.js
  - Server runs at http://localhost:5000
 
🌐 2. Frontend Setup
- cd ../client
- npm install
- npm start
- App opens at http://localhost:3000

✨ Future Improvements
🔐 User login/signup (JWT Auth)

💡 AI-powered skill extraction (OpenAI/GPT)

📊 Admin dashboard (analytics)

📄 PDF export of job matches

📌 Bookmark/save jobs
