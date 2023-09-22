from fastapi import APIRouter
import torch

from domain.text import text_schema
from . import disease_kobert_model

router = APIRouter(
    prefix="/api/text",
)

@router.post("/text_diagnosis")
async def run_kobert_model(_text_data: text_schema.KobertTargetText):
    input_text = _text_data.text
    diagnosis_result = disease_kobert_model.predict(input_text)
    return {"result": diagnosis_result}