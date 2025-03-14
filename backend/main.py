from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from authlib.integrations.starlette_client import OAuth
from starlette.requests import Request
from starlette.config import Config
from .config import settings
import jwt

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure OAuth
oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.google_client_id,
    client_secret=settings.google_client_secret,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)


@app.get("/api/auth/google/login")
async def google_login(request: Request):
    redirect_uri = settings.google_redirect_uri
    return await oauth.google.authorize_redirect(request, redirect_uri)


@app.get("/api/auth/google/callback")
async def google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")
    if user_info:
        # Create JWT token
        access_token = jwt.encode(
            {"email": user_info["email"], "sub": user_info["sub"]},
            settings.secret_key,
            algorithm="HS256",
        )
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Failed to get user info")
