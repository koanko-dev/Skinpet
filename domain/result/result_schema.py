from pydantic import BaseModel, ConfigDict

class DiseaseInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    # img: str | None = None
    title: str
    definition: str
    care_method: str
    symptoms: str
    treatment_process: str

class HospitalInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    address: str
    phone_num: str
    