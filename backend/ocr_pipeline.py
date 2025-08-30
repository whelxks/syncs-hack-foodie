import pytesseract
import json
import os
import logging
import time

from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class OCRPipeline():

  def __init__(self, model:str):
    self.gemini_model = model
    self.gemini_client = genai.Client(api_key = os.environ.get("GEMINI_API_KEY"))
    self.generate_content_config = types.GenerateContentConfig(
      thinking_config = types.ThinkingConfig(thinking_budget=-1),
      tools = [types.Tool(googleSearch=types.GoogleSearch())],
      system_instruction = [types.Part.from_text(
        text = "Extract all food item names from the provided text. Present the results as a JSON array where each element is a string representing a food item name. Do not include any other text or explanation in the response."
      )]
    )

  def _llm_post_processing(self, text: str):
    start = time.time()

    result = text[:]
    unwanted_substrings = ["\n", "json", "```"]
    for substr in unwanted_substrings:
      result = result.replace(substr, "")
    try:  
      json_output = json.loads(result)
    except Exception as e:
      print(f"{result} cannot be parsed")
      raise e
    
    end = time.time()
    logging.info(f"Post Processing: {end - start:.4f} seconds")

    return json_output


  def get_food_items(self, img_bytes:bytes):
    start = time.time()

    """ OCR Engine """
    ocr_text: str = pytesseract.image_to_string(
      Image.open(
        BytesIO(img_bytes)
      )
    )

    mid = time.time()
    logging.info(f"OCR Engine: {mid - start:.4f} seconds")

    """ LLM Parser """
    llm_response = self.gemini_client.models.generate_content(
      model = self.gemini_model,
      contents = [
        types.Content(role="user", parts=[
          types.Part.from_text(text=ocr_text)
        ])
      ],
      config = self.generate_content_config
    )

    end = time.time()
    logging.info(f"LLM Parser: {end - mid:.4f} seconds")

    return self._llm_post_processing(llm_response.text)