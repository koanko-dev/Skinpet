from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from domain.result import result_schema, result_crud
from models import DiseaseInfo, HospitalInfo

router = APIRouter(
    prefix="/api/result",
)


@router.get("/{disease_id}", response_model=result_schema.DiseaseInfo)
def result(disease_id: int, db: Session = Depends(get_db)):
    disease_info = result_crud.get_disease_info(db, disease_id=disease_id)
    # 주변 병원 정보 함께 담아서 보내야 함
    return disease_info
