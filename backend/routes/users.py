import os
from typing import Optional, List
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from jose import jwt, JWTError
from bson import ObjectId
from dotenv import load_dotenv
from database import get_database

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "nexora_secret_key_2026")
ALGORITHM = "HS256"

router = APIRouter(prefix="/users", tags=["users"])
bearer_scheme = HTTPBearer()


# ── Pydantic Schemas ──────────────────────────────────────────────────────────

class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    about: Optional[str] = None
    passionTags: Optional[List[str]] = None
    currentlyWorkingOn: Optional[str] = None
    college: Optional[str] = None
    course: Optional[str] = None
    year: Optional[int] = None


# ── Helpers ───────────────────────────────────────────────────────────────────

def decode_token(token: str) -> str:
    """Decode JWT and return the user id (sub claim)."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing subject."
            )
        return user_id
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token."
        )


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
) -> str:
    """FastAPI dependency — extracts & validates the Bearer token."""
    return decode_token(credentials.credentials)


def serialize_user(user: dict) -> dict:
    """Convert MongoDB document to JSON-serialisable dict without password."""
    user["id"] = str(user["_id"])
    user.pop("_id", None)
    user.pop("password", None)
    return user


# ── Routes ────────────────────────────────────────────────────────────────────

@router.get("/me", status_code=status.HTTP_200_OK)
async def get_me(user_id: str = Depends(get_current_user_id)):
    db = get_database()
    users = db["users"]

    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user id in token."
        )

    user = await users.find_one({"_id": oid})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    return {"user": serialize_user(user)}


@router.put("/me", status_code=status.HTTP_200_OK)
async def update_me(
    data: UpdateProfileRequest,
    user_id: str = Depends(get_current_user_id)
):
    db = get_database()
    users = db["users"]

    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user id in token."
        )

    # Only include fields that were explicitly provided (not None)
    update_fields = {
        key: value
        for key, value in data.model_dump().items()
        if value is not None
    }

    if not update_fields:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields provided to update."
        )

    result = await users.find_one_and_update(
        {"_id": oid},
        {"$set": update_fields},
        return_document=True,   # Return the updated document
    )

    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    return {"user": serialize_user(result)}
