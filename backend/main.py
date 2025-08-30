import boto3
import os
import time
import logging

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from item_pipeline import ItemPipeline

load_dotenv()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

ITEM_PIPELINE = ItemPipeline(model="gemini-2.5-flash", api_key=os.environ.get("GEMINI_API_KEY"))
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


@app.get("/itemModel")
def get_food_items(bucket: str, key: str):
  """ Upload image to Gemini to get structured output """

  file_ext = key.split("/")[-1].split(".")[-1]
  file_ext = "jpeg" if file_ext == "jpg" else file_ext

  #? Body is a streamingbody
  img_bytes: bytes = S3_CLIENT.get_object(Bucket=bucket, Key=key)['Body'].read()

  return ITEM_PIPELINE.get_item_model(img_bytes, ext = file_ext)