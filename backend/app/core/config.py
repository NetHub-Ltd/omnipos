import enum

from pydantic_settings import BaseSettings, SettingsConfigDict


# environment enum
class Environment(str, enum.Enum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=("./.env", "./.env.local"),
        env_file_encoding="utf-8",
        extra="ignore",
    )
    # App Config
    app_name: str
    app_version: str
    environment: Environment

    # Database Settings
    DATABASE_NAME: str
    DATABASE_USER: str
    DATABASE_HOST: str
    DATABASE_PORT: int
    DATABASE_PASSWORD: str

    resource_server: str

    @property
    def async_db_url(self) -> str:
        return f"postgresql+asyncpg://{self.DATABASE_USER}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"

    @property
    def sync_db_url(self) -> str:
        return f"postgresql://{self.DATABASE_USER}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"

    @property
    def is_prod(self) -> bool:
        return self.environment == Environment.PRODUCTION


settings = Settings()
