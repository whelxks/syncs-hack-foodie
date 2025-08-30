import boto3
import os

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()


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
def get_presigned_url(req: ObjectPath):
  """ Request a presigned url from AWS S3 """

  return S3_CLIENT.generate_presigned_url(
    ClientMethod = 'put_object',
    Params = {
      "Bucket": req.bucket,
      "Key": req.key,
    },
    ExpiresIn = 600
  )

