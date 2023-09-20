from fastapi import APIRouter
import torch
# from BERTClassifier import BERTClassifier

from domain.text import text_schema

router = APIRouter(
    prefix="/api/text",
)

@router.post("/run_kobert")
async def run_kobert_model(_text_data: text_schema.KobertTargetText):
    input_text = _text_data.text

    # model = torch.load('model/result_model.pt')
    # model.eval()
