from fastapi import HTTPException
from skinpet_models import DiseaseInfo, HospitalInfo
from sqlalchemy.orm import Session
import pandas as pd


def get_disease_info(db: Session, disease_title: str):
    # disease_info = db.get(DiseaseInfo, disease_id)
    disease_infos = db.query(DiseaseInfo).filter(DiseaseInfo.title == disease_title).all()
    return disease_infos[0]

# load csv file
def read_csv_file(file_path):
    try:
        df = pd.read_csv(file_path)
        return df
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading CSV file: {str(e)}")

# 데이터베이스에 데이터 적재
def load_csv_data_to_db(db, data):
    try:
        for _, row in data.iterrows():
            db_item = HospitalInfo(**row.to_dict())
            db.add(db_item)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
