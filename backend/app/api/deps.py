from typing import AsyncGenerator, Annotated
from typing import Optional

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from loguru import logger
from pydantic import ValidationError
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import settings
from app.core.session import AsyncSessionLocal
from app.schemas.schemas import UserRead
# from app.db.schemas.schemas import TokenData
from app.utils.logging import logger

# ------------------------------------------------------------------
# HTTP Bearer (Resource Server Pattern)
# ------------------------------------------------------------------

bearer_scheme = HTTPBearer(auto_error=False)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Provides a scoped AsyncSession for each request.
    Optimized for SQLModel + asyncpg.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            # We don't commit here. The Service Layer handles the 'Save'.
        except SQLAlchemyError as e:
            # Explicit rollback ensures the DB connection is clean
            await session.rollback()
            logger.error("DB Session Error | {}", str(e))
            raise
        # No 'finally' needed; 'async with' handles closure automatically



#
# async def get_current_user(
#         credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
# ):
#     """
#     Delegated Identity Resolution.
#     Passes the Bearer token to NetHub Central (RS) to retrieve the
#     internalized user context and tenancy.
#     """
#     # 1. Header Enforcement
#     if not credentials or not credentials.credentials:
#         logger.warning("Auth Fail | Reason: Missing Authorization Header")
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Authentication required",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#
#     token = credentials.credentials
#
#     # 2. RS Identity Handshake
#     async with httpx.AsyncClient() as client:
#         try:
#             # We hit the RS /users/me endpoint using the user's current token
#             response = await client.get(
#                 f'{settings.resource_server}/users/me',
#                 headers={"Authorization": f"Bearer {token}"},
#                 timeout=30  # Strict timeout for POS performance
#             )
#
#             # 3. Handle RS Response States
#             if response.status_code == 401:
#                 logger.error("Auth Fail | RS Reason: Token Invalid or Expired")
#                 raise HTTPException(status_code=401, detail="Invalid session")
#
#             if response.status_code == 403:
#                 logger.warning("Auth Forbidden | RS Reason: Account Disabled/Unauthorized")
#                 raise HTTPException(status_code=403, detail="Access denied by NetHub Central")
#
#             if response.status_code != 200:
#                 logger.error(f"Auth Fail | RS Status: {response.status_code}")
#                 raise HTTPException(status_code=502, detail="Identity service unavailable")
#
#             # 4. Extract Internalized Identity
#             # Expected RS response: {"id": "uuid", "tenant_id": "uuid", "is_active": true, ...}
#             user_data = response.json()
#
#             logger.info(f"Auth Success | internal_id: {user_data.get('id')}")
#
#             user_validated_data = UserRead(**user_data)
#
#             return user_validated_data
#
#         except httpx.RequestError as e:
#             logger.error(f"Network Error | RS unreachable: {str(e)}")
#             raise HTTPException(
#                 status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
#                 detail="NetHub Identity Provider is currently unreachable"
#             )
#         except ValidationError as error:
#             logger.error(f"Validation Error: {str(error)}")
#             raise HTTPException(
#                 status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
#                 detail="NetHub Identity Provider is currently unreachable"
#             )


import hashlib
from app.core.httpx import client_pool

# Using a simple LRU cache for demonstration; in production, use Redis
from cachetools import TTLCache

token_cache = TTLCache(maxsize=1000, ttl=300)  # Cache for 5 minutes


async def get_current_user(
        credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer()),
) -> UserRead:
    if not credentials:
        raise HTTPException(status_code=401, detail="Missing Auth Header")

    token = credentials.credentials
    # Create a hash of the token to use as a cache key
    token_hash = hashlib.sha256(token.encode()).hexdigest()

    # Check Cache First
    if token_hash in token_cache:
        return token_cache[token_hash]

    try:
        response = await client_pool.get(
            f"{settings.resource_server}/users/me",
            headers={"Authorization": f"Bearer {token}"}
        )

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="RS Auth Failed")

        user_data = response.json()
        user_validated_data = UserRead(**user_data)

        # Store in Cache
        token_cache[token_hash] = user_validated_data

        return user_validated_data
    except (httpx.RequestError, ValidationError) as error:
        logger.error(f"Error occurred: {error}")
        raise HTTPException(status_code=503, detail="Identity service unreachable")






SessionDep = Annotated[AsyncSession, Depends(get_session)]
AuthUser = Annotated[UserRead, Depends(get_current_user)]