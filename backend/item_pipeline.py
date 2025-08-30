import logging
import time
import json

from google import genai
from google.genai import types

class ItemPipeline():
  
  def __init__(self, model: str, api_key: str):
    self.gemini_model = model
    self.gemini_client = genai.Client(api_key = api_key)
    self.generate_content_config = types.GenerateContentConfig(
      thinking_config = types.ThinkingConfig(thinking_budget=-1),
      tools = [types.Tool(googleSearch=types.GoogleSearch())],
      system_instruction=[
        types.Part.from_text(text="""Given an image, determine the following fields for a listing. The output should be a structured JSON response without explanation.
The fields are:
category: literal[\"Electronics\", \"Fashion\", \"Food & Drinks\", \"Furniture\", \"Education\", \"Others\"]
title: string
condition: literal[\"new\", \"well_used\", \"heavy used\"]
description: string (max 100 words)"""),
        ],
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

  def get_item_model(self, img_bytes: bytes, ext: str):
    start = time.time()
    gemini_response = self.gemini_client.models.generate_content(
      model = self.gemini_model,
      config = self.generate_content_config,
      contents = [
        types.Content(role="user", parts=[
          types.Part.from_bytes(
            data=img_bytes,
            mime_type=f"image/{ext}"
          )
        ])
      ]
    )
    end = time.time()
    logging.info(f"Gemini Execution: {end-start:.4f} seconds")

    return self._llm_post_processing(gemini_response.text)