from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import openai
import json


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return "Hello"

@app.route('/enhance-resume', methods=['POST'])
def enhance_resume():
    try:
        # Get the job description and resume file from the request
        job_description = request.form.get('jd')
        resume_file = request.files.get('resume')

        if not job_description or not resume_file:
            return jsonify({"error": "Job description or resume file is missing"}), 400

        # Extract text from the uploaded PDF using pdfplumber
        with pdfplumber.open(resume_file) as pdf:
            resume_text = ''.join([page.extract_text() or '' for page in pdf.pages])

        if not resume_text:
            return jsonify({"error": "Failed to extract text from the resume PDF"}), 400

        try:
            with open("sampleformat.txt", "r") as f:
                latex_template = f.read()
        except FileNotFoundError:
            return jsonify({"error": "sample.txt template file not found"}), 500
        
        # Prepare prompts with stronger emphasis on JSON-only response
        system_prompt = (
            "You are an AI assistant that analyzes resumes and job descriptions. "
            "Analyze the resume and job description and ONLY respond with a valid JSON object. "
            "Do not include any explanatory text, thinking, or any content outside the JSON object. "
            "The JSON object must have the following keys: 'enhanced_content' (an object with resume sections), "
            "'matching_keywords' (an array), 'recommendations' (an array), and 'latex_code' (a string containing LaTeX)."
        )
        
        user_prompt = (
            f"Job Description: {job_description}\n\n"
            f"Resume Text: {resume_text}\n\n"
            f"LaTeX Template:\n{latex_template}\n\n"
            "Please enhance the resume to match the job description, extract important matching keywords, "
            "give at least five improvement recommendations, and generate LaTeX code for the updated resume "
            "based on the template provided above. Respond ONLY in valid JSON format."
        )

        # Call the SambaNova API via OpenAI client
        client = openai.OpenAI(
            api_key="a7688968-6b12-4bda-9697-5a260d4daaba",
            base_url="https://api.sambanova.ai/v1",
        )

        response = client.chat.completions.create(
            model="DeepSeek-R1",  # Replace with correct model if needed
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.1,
            top_p=0.1
        )

        # Parse AI response
        ai_response = response.choices[0].message.content

        print("AI Response:", ai_response)  # Debugging line
        
        # Attempt to extract just the JSON portion if there's thinking text
        json_start = ai_response.find('{')
        json_end = ai_response.rfind('}') + 1
        
        if json_start >= 0 and json_end > json_start:
            # Try to extract just the JSON part
            json_content = ai_response[json_start:json_end]
            try:
                suggestions_data = json.loads(json_content)
                print("Successfully parsed JSON from response")
            except json.JSONDecodeError as e:
                print(f"Failed to parse extracted JSON: {e}")
                # If that fails, provide fallback response
                suggestions_data = {
                    "enhanced_content": ai_response,
                    "matching_keywords": [],
                    "recommendations": [],
                    "latex_code": ""
                }
        else:
            print("No JSON structure found in response")
            # No JSON found, provide fallback
            suggestions_data = {
                "enhanced_content": ai_response,
                "matching_keywords": [],
                "recommendations": [],
                "latex_code": ""
            }

        return jsonify(suggestions_data)

    except Exception as e:
        print(f"Error in enhance-resume: {str(e)}")
        return jsonify({"error": "An error occurred", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)