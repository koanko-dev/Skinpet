from skinpet_models import DiseaseInfo, HospitalInfo
from sqlalchemy.orm import Session


def get_disease_info(db: Session, disease_title: str):
    # disease_info = db.get(DiseaseInfo, disease_id)
    disease_infos = db.query(DiseaseInfo).filter(DiseaseInfo.title == disease_title).all()
    return disease_infos[0]
