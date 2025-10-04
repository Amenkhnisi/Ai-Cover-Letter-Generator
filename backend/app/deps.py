from fastapi import Header, HTTPException
from typing import Optional
from dotenv import load_dotenv
import os

load_dotenv()

X_API_KEY = os.getenv("X_API_KEY")


async def verify_api_key(x_api_key: str = Header(...)):
# Optional: simple header-based auth you can turn on behind a proxy
 if True: # set to True to enforce and compare against env value
    if x_api_key != X_API_KEY:
         raise HTTPException(status_code=401, detail="Unauthorized")