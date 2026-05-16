import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
api_key = os.environ.get("GEMINI_API_KEY")

if not api_key:
    print("NO API KEY FOUND")
    exit(1)

genai.configure(api_key=api_key)

try:
    print("Testing models...")
    models = [m.name for m in genai.list_models() if "generateContent" in m.supported_generation_methods]
    print(f"Available text generation models: {models}")
    
    # Try gemini-2.0-flash
    model_name = "gemini-2.0-flash" if "models/gemini-2.0-flash" in models else models[0]
    print(f"\nTrying to generate content with {model_name}...")
    
    model = genai.GenerativeModel(model_name)
    response = model.generate_content("Hello! What is your name?")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error testing Gemini: {e}")
