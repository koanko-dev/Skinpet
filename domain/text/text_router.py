from fastapi import APIRouter
import torch

from domain.text import text_schema
from . import disease_kobert_model

router = APIRouter(
    prefix="/api/text",
)

@router.post("/run_kobert")
async def run_kobert_model(_text_data: text_schema.KobertTargetText):
    input_text = _text_data.text

    print('------------PREDICT-------------', disease_kobert_model.predict(input_text))