import os
import re
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, field_validator
from passlib.context import CryptContext
from jose import jwt
from dotenv import load_dotenv
from database import get_database

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "nexora_secret_key_2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 7

router = APIRouter(prefix="/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ── Pydantic Schemas ──────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    college: str
    course: str
    year: int

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        if not re.match(r"^[\w.+-]+@[\w-]+\.[\w.]+$", v):
            raise ValueError("Invalid email address.")
        return v.lower()


class LoginRequest(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        return v.lower()


# ── Helpers ───────────────────────────────────────────────────────────────────

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def serialize_user(user: dict) -> dict:
    """Convert MongoDB document to a JSON-serialisable dict (removes password)."""
    user["id"] = str(user["_id"])
    user.pop("_id", None)
    user.pop("password", None)
    return user


# ── Routes ────────────────────────────────────────────────────────────────────

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest):
    db = get_database()
    users = db["users"]

    # Check for existing email
    existing = await users.find_one({"email": data.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )

    # Build user document
    new_user = {
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password),
        "college": data.college,
        "course": data.course,
        "year": data.year,
        "bio": "",
        "about": "",
        "passionTags": [],
        "currentlyWorkingOn": "",
        "avatar": "",
        "profileCompleted": False,
        "avgRating": 0,
        "totalReviews": 0,
        "followersCount": 0,
        "followingCount": 0,
        "connectionsCount": 0,
        "growthScore": 0,
        "createdAt": datetime.utcnow(),
    }

    result = await users.insert_one(new_user)
    new_user["_id"] = result.inserted_id

    token = create_access_token({"sub": str(result.inserted_id), "email": data.email})

    return {
        "token": token,
        "user": serialize_user(new_user),
    }


@router.post("/login", status_code=status.HTTP_200_OK)
async def login(data: LoginRequest):
    db = get_database()
    users = db["users"]

    # Find user by email
    user = await users.find_one({"email": data.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    # Verify password
    if not verify_password(data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    token = create_access_token({"sub": str(user["_id"]), "email": user["email"]})

    return {
        "token": token,
        "user": serialize_user(user),
    }
