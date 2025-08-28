TailorMyResume — AI-Powered Resume Enhancer 📄✨
TailorMyResume is a full-stack web application that helps you optimize your resume for specific job descriptions. By analyzing your resume and a target job description, it generates enhanced content, identifies key skills, and provides actionable recommendations. The app also generates a clean, professional resume in LaTeX format.

🚀 Features
AI-Powered Enhancement: 🧠 Analyzes your resume and a job description to generate new, quantified bullet points that highlight your most relevant skills.

Keyword Matching: 🎯 Identifies and lists the most important keywords from the job description that match your experience.

Actionable Recommendations: 💡 Provides clear suggestions for how to improve your resume's content and structure.

LaTeX Generation: ✍️ Creates a professionally formatted resume in LaTeX code, which you can easily download and compile.

PDF Processing: 📥 Extracts text from uploaded PDF resumes for a seamless analysis process.

💻 Tech Stack
Frontend
React

Tailwind CSS

Axios

Lucide React

Backend
Python

Flask

OpenAI (for SambaNova API)

pdfplumber

Flask-CORS

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
Navigate to the backend directory:

Bash

cd backend
Install dependencies:

Bash

pip install -r req.txt
Configure API Key: Locate backend/app.py and replace the placeholder with your SambaNova API key.

Run the server:

Bash

python app.py
The backend will start and run on http://127.0.0.1:5000.

🖥️ Frontend — Quick Start
Navigate to the frontend directory:

Bash

cd frontend
Install dependencies:

Bash

npm install
Run the application:

Bash

npm start
The React development server will start. Go to http://localhost:3000 in your browser to access the application.

🧑‍💻 Usage
Launch the App: Ensure both the frontend and backend servers are running.

Input Data: On the homepage, paste the job description you are targeting and upload your resume as a PDF file.

Enhance: Click the "Enhance My Resume" button. The application will send your data to the AI model.

Review and Download: Once the process is complete, you will see a page with your enhanced resume content, a list of matched keywords, and a section with valuable recommendations. You can download the new content as a JSON file or get the generated LaTeX code.

🤝 Contributing
Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

