import boto3
import os
import time
import logging

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from ocr_pipeline import OCRPipeline

load_dotenv()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

OCR_PIPELINE = OCRPipeline(model="gemini-2.5-flash")
S3_CLIENT = boto3.client(
  's3',
  region_name = "ap-southeast-2",
  aws_access_key_id = os.environ.get('aws_access_key_id'),
  aws_secret_access_key = os.environ.get('aws_secret_access_key'),
  aws_session_token = os.environ.get('aws_session_token')
)
app = FastAPI()



@app.get("/health")
def health_check():
  return "Health Checked"


class ObjectPath(BaseModel):
  bucket: str
  key: str


@app.get("/upload")
def get_presigned_url(bucket: str, key: str):
  """ Request a presigned url from AWS S3 """
  return {
    "url": S3_CLIENT.generate_presigned_url(
      ClientMethod = 'put_object',
      Params = {
        "Bucket": bucket,
        "Key": key,
      },
      ExpiresIn = 600
    )
  }



@app.get("/foodItems")
def get_food_items(req: ObjectPath):
  """ Download the image from S3 & Run OCR Pipeline """

  start = time.time()
  #? Body is a streamingbody
  img_bytes: bytes = S3_CLIENT.get_object(Bucket=req.bucket, Key=req.key)['Body'].read()
  end = time.time()
  logger.info(f"S3 Get Object: {end - start:4.f} seconds")

  return {
    "foodItems": OCR_PIPELINE.get_food_items(img_bytes)
  }