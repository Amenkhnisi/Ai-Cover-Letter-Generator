# from openai import OpenAI
import os
from dotenv import load_dotenv
from google import genai


load_dotenv()

_client = None


def get_client() -> genai.Client:
    global _client

    if _client is None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise RuntimeError("OPENAI_API_KEY not set")
        _client = genai.Client(api_key=api_key)
    return _client
