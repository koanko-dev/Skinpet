from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session
from fastapi import File, UploadFile
from starlette.responses import Response
import io
from PIL import Image
import json

from database import get_db
from skinpet_models import DiseaseInfo, HospitalInfo
from domain.result import result_schema, result_crud
from domain.result.segmentation import get_yolov5, get_image_from_bytes

router = APIRouter(
    prefix="/api/result",
)

@router.post("/detection")
async def detect_disease_return_json_result(file: bytes = File(...), extra_data: str = Form(...)):
    extra_data_json = json.loads(extra_data)
    model = get_yolov5(extra_data_json['species'], extra_data_json['text_result'])
    input_image = get_image_from_bytes(file)
    results = model(input_image)

    detect_res = results.pandas().xyxy[0].to_json(orient="records")
    detect_res = json.loads(detect_res)
    return {"result": detect_res}

@router.post("/detected_img")
async def detect_disease_return_base64_img(file: bytes = File(...), extra_data: str = Form(...)):
    extra_data_json = json.loads(extra_data)
    model = get_yolov5(extra_data_json['species'], extra_data_json['text_result'])
    input_image = get_image_from_bytes(file)
    results = model(input_image)

    results.render()  # updates results.ims with boxes and labels
    for img in results.ims:
        bytes_io = io.BytesIO()
        img_base64 = Image.fromarray(img)
        img_base64.save(bytes_io, format="jpeg")

    return Response(content=bytes_io.getvalue(), media_type="image/jpg")

# @router.get("/{disease_id}", response_model=result_schema.DiseaseInfo)
# def result(disease_id: int, db: Session = Depends(get_db)):
#     disease_info = result_crud.get_disease_info(db, disease_id=disease_id)
#     # 주변 병원 정보 함께 담아서 보내야 함
#     return disease_info

