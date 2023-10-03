import React from "react";

import styled from "styled-components";

import palette from "../../lib/styles/palette";
import AreaFilter from "./AreaFilter";
import FilteredHospitalItem from "./FilteredHospitalItem";

const HospitalInfoSection = ({ hospitalFilterHandler, hospitalInfoList }) => {
  return (
    <HospitalInfoBox>
      <Title>병원 정보</Title>
      <AreaFilter onFilter={hospitalFilterHandler} />
      <HospitalListBox>
        <FilteredHospitalItem
          info={{ name: "병원 이름", address: "주소", phone_num: "전화번호" }}
          isCol
        ></FilteredHospitalItem>
        {hospitalInfoList.length > 0 ? (
          hospitalInfoList.map((hospitalInfo) => {
            return (
              <FilteredHospitalItem key={hospitalInfo.id} info={hospitalInfo} />
            );
          })
        ) : (
          <p>검색된 병원 정보가 없습니다.</p>
        )}
      </HospitalListBox>
    </HospitalInfoBox>
  );
};

export default HospitalInfoSection;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  margin: 0 0 1.5rem;
  text-align: center;
`;

const HospitalInfoBox = styled.section`
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
`;

const HospitalListBox = styled.div`
  margin-top: 2rem;
  text-align: center;

  > p {
    color: ${palette.gray[6]};
  }
`;
