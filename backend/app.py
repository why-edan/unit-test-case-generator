from fastapi import FastAPI, HTTPException
from pydantic import BaseModel,Field
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()
import os

# asdsadadasd



import logging
import sys  # Add this for stdout flushing

# ✅ TEST: Check if print and logging work
print("Hello, world!", flush=True)  # This should appear in the terminal immediately
sys.stdout.flush()
logging.info("Logging works!")

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend domain for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
API_KEY = os.getenv("API_KEY")  
MODEL_NAME = os.getenv("MODEL_NAME")
genai.configure(api_key=API_KEY)

# Define request model
class CodeRequest(BaseModel):
    input_code: str = Field(..., description="Multi-line source code")
    language: str


    

# Define route for unit test generation
@app.post("/generate-unit-test")
async def generate_unit_test(data: CodeRequest):
    print("Function called!")
    input_code = data.input_code
    language = data.language

    # Check for empty inputs
    if not input_code or not language:
        raise HTTPException(status_code=400, detail="Both input_code and language are required.")

    # Construct prompt for Gemini API
    prompt = f"""
    Generate a well-structured and concise unit test case for the following {language} code:
    
    Code:
    {input_code}

    Instructions:
    - Provide a unit test case that covers key functions.
    - Ensure the test is formatted correctly for {language}.
    - Avoid any redundant code.
    """

    # Generate unit test case
    # Generate unit test case
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)
        print(response)

        unit_test_code = response.text.strip()

        # Print generated unit test case to FastAPI console
        print("\nGenerated Unit Test Case:\n")
        print(unit_test_code)
        print("\n=============================\n")

        return {"unit_test_code": unit_test_code}  

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating unit test: {str(e)}")


# Root endpoint for testing
@app.get("/")
def home():
    return {"message": "Unit Test Generator API is running!"}
