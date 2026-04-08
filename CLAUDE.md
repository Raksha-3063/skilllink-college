# SkillLink College — Project Guide

## Project Overview

SkillLink College is a full-stack web application with a **React + Vite** frontend and a **FastAPI + MongoDB** backend. It is designed to connect college students with skill-building opportunities.

---

## Repository Structure

```
skilllink-college/
├── backend/                    # FastAPI Python backend
│   ├── app.py                  # FastAPI app entry point, middleware, router registration
│   ├── database.py             # MongoDB connection helpers (Motor async driver)
│   ├── routes/
│   │   ├── auth.py             # Authentication routes (register, login, JWT)
│   │   └── users.py            # User profile routes
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables (not committed)
│   └── .venv/                  # Python virtual environment (backend-local)
├── src/                        # React frontend source
├── public/                     # Static assets
├── index.html                  # Vite HTML entry point
├── package.json                # Node.js dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── pyrightconfig.json          # Pyright type-checker config (root-level, points to backend)
```

---

## Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Routing | React Router DOM v6 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Styling | Tailwind CSS v3 |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack Query (React Query) v5 |
| Charts | Recharts |
| Notifications | Sonner |

### Backend
| Layer | Technology |
|---|---|
| Framework | FastAPI |
| Server | Uvicorn (ASGI) |
| Database | MongoDB (via Motor async driver) |
| Auth | JWT — `python-jose[cryptography]` |
| Password Hashing | `passlib[bcrypt]` |
| Validation | Pydantic v2 |
| Env vars | `python-dotenv` |

---

## Development Setup

### Frontend

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Run tests
npm test

# Lint
npm run lint

# Build for production
npm run build
```

### Backend

> All backend commands must be run from the `backend/` directory with the virtual environment activated.

```powershell
# Navigate to backend
cd backend

# Activate virtual environment (Windows PowerShell)
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Start backend server (http://localhost:8000)
uvicorn app:app --reload
```

---

## Environment Variables

The backend reads its config from `backend/.env`. Create this file if it does not exist:

```env
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=skilllink
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## API Overview

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Health check — returns `{"message": "Backend is running 🚀"}` |
| `GET` | `/health` | Health check — returns `{"status": "OK"}` |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive a JWT access token |
| `GET` | `/users/me` | Get current authenticated user profile |
| `PUT` | `/users/me` | Update current user profile |

CORS is configured to allow requests from `http://localhost:5173` (Vite dev server).

---

## Key Architecture Notes

- **Backend virtual environment** lives inside `backend/.venv/`. Always activate it before running Python commands.
- **Pyright** is configured at both the root (`pyrightconfig.json`) and inside `backend/` — the root config's `venvPath` should point to `backend/`.
- **MongoDB** is connected asynchronously using Motor. The `lifespan` context manager in `app.py` handles connect on startup and disconnect on shutdown.
- **JWT authentication** is implemented in `backend/routes/auth.py` using `python-jose`. Protected routes use a `get_current_user` dependency.
- The frontend proxies API calls to the backend via the Vite dev server (check `vite.config.ts` for proxy settings).

---

## Common Commands Cheat Sheet

```powershell
# Start everything (two separate terminals)

# Terminal 1 — Frontend
npm run dev

# Terminal 2 — Backend
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn app:app --reload
```
