from sqlalchemy import Column, Integer, String, Text, ForeignKey

from database import Base


class DiseaseInfo(Base):
    __tablename__ = "disease_info"

    id = Column(Integer, primary_key=True)
    # img = Column(Integer, nullable=True)
    title = Column(String, nullable=False)
    definition = Column(Text, nullable=False)
    care_method = Column(Text, nullable=False)
    symptoms = Column(Text, nullable=False)
    treatment_process = Column(Text, nullable=False)


class HospitalInfo(Base):
    __tablename__ = "hospital_info"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    phone_num = Column(String, nullable=False)
    address = Column(String, nullable=False)
    sido = Column(String, nullable=False)
    sigungu = Column(String, nullable=True)
