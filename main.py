from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from domain.result import result_router
from domain.text import text_router

app = FastAPI()

origins = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(result_router.router)
app.include_router(text_router.router)