from skinpet_models import DiseaseInfo, HospitalInfo
from sqlalchemy.orm import Session


def get_disease_info(db: Session, disease_id: int):
    disease_info = db.query(DiseaseInfo).get(disease_id)
    return disease_info
