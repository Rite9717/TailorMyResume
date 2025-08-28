✨ TailorMyResume — AI-Powered Resume Enhancer 📄💼

TailorMyResume is a full-stack web application that helps you optimize your resume for specific job descriptions.
By analyzing your resume and a target job description, it generates enhanced content, identifies key skills, and provides actionable recommendations.
It also generates a professional LaTeX resume for download.

🚀 Features

🧠 AI-Powered Enhancement – Generates quantified, impactful bullet points tailored to the job description.

🎯 Keyword Matching – Extracts and highlights important job keywords that align with your experience.

💡 Actionable Recommendations – Provides clear guidance to improve content and structure.

✍️ LaTeX Resume Generation – Produces a clean, professional LaTeX-formatted resume.

📥 PDF Processing – Extracts text from uploaded PDF resumes for seamless analysis.

💻 Tech Stack
🌐 Frontend

⚛️ React

🎨 Tailwind CSS

🔗 Axios

🖼️ Lucide React

⚙️ Backend

🐍 Python

🔥 Flask + Flask-CORS

🤖 OpenAI (via SambaNova API)

📑 pdfplumber

📂 Project Structure
.
├── /backend
│   ├── app.py               # Flask application
│   ├── req.txt              # Python dependencies
│   ├── sampleformat.txt     # LaTeX template
│   └── /generated           # Output directory
│
└── /frontend
    ├── src/                 # React app source
    ├── public/
    ├── package.json
    └── tailwind.config.js

⚙️ Backend — Quick Start
cd backend
pip install -r req.txt
# Add your SambaNova API key in app.py
python app.py


👉 Server runs at http://127.0.0.1:5000

🖥️ Frontend — Quick Start
cd frontend
npm install
npm start


👉 React dev server runs at http://localhost:3000

🧑‍💻 Usage

🚀 Launch the app (both frontend & backend must be running).

📄 Upload your resume (PDF) and paste the job description.

✨ Click "Enhance My Resume".

🔍 Review results:

✅ Enhanced resume bullet points

🎯 Extracted keywords

💡 Improvement recommendations

📥 Download as JSON or LaTeX code for a polished resume.

🤝 Contributing

Contributions are welcome! 💖

🍴 Fork the project

🌱 Create a branch (git checkout -b feature/AmazingFeature)

💾 Commit (git commit -m 'Add some AmazingFeature')

📤 Push (git push origin feature/AmazingFeature)

🔁 Open a Pull Request
