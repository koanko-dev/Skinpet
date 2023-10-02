from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session
from fastapi import File
from starlette.responses import Response
import io
from PIL import Image
import json

from database import get_db, SessionLocal
from domain.result import result_schema, result_crud
from domain.result.segmentation import get_yolov5, get_image_from_bytes

router = APIRouter(
    prefix="/api/result",
)

detected_results = []

@router.post("/detected_json")
async def detect_disease_return_json_result(file: bytes = File(...), extra_data: str = Form(...)):
    global detected_results

    extra_data_json = json.loads(extra_data)
    species = extra_data_json['species']
    text_result = extra_data_json['text_result']
    input_image = get_image_from_bytes(file)

    if text_result == None:
        models = get_yolov5(species)
    else:
        models = get_yolov5(species, text_result)

    results = []
    for model in models:
        result = model(input_image)
        detected_results.append(result)
        detect_res = result.pandas().xyxy[0].to_json(orient="records")
        detect_res = json.loads(detect_res)
        results.append(detect_res)

    return {"results": results}

@router.post("/detected_img")
async def detect_disease_return_base64_img(_target_result_idx: result_schema.TargetIndex):
    target_result = detected_results[_target_result_idx.target_index]
    target_result.render()  # updates results.ims with boxes and labels
    bytes_io = io.BytesIO()
    img_base64 = Image.fromarray(target_result.ims[0])
    img_base64.save(bytes_io, format="jpeg")

    return Response(content=bytes_io.getvalue(), media_type="image/jpg")

@router.get("/{disease_title}", response_model=result_schema.DiseaseInfo)
def result(disease_title: str, db: Session = Depends(get_db)):
    disease_info = result_crud.get_disease_info(db, disease_title=disease_title)
    # 주변 병원 정보 함께 담아서 보내야 함
    return disease_info

# CSV 파일을 데이터베이스로 저장하는 엔드포인트
@router.post("/load_csv_data")
def load_csv_data():
    db = SessionLocal()
    df = result_crud.read_csv_file('utils/sido_hospital_list.csv')
    result_crud.load_csv_data_to_db(db, df)
    return {"message": "Data loaded successfully"}

