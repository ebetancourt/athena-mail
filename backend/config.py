from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    google_client_id: str
    google_client_secret: str
    google_redirect_uri: str = "http://localhost:3000/auth/callback"
    secret_key: str = "your-secret-key-here"  # Change this in production!

    class Config:
        env_file = ".env"


settings = Settings()
