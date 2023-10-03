import React from "react";

import styled from "styled-components";
import palette from "../../lib/styles/palette";

const FilteredHospitalItem = ({ info, isCol }) => {
  return (
    <ItemBox isCol={isCol}>
      <Name>{info.name}</Name>
      <Num>{info.phone_num}</Num>
      <Address>{info.address}</Address>
    </ItemBox>
  );
};

export default FilteredHospitalItem;

const colStyle = ({ isCol }) => {
  if (isCol) {
    return `
        font-weight: 500;
        border-bottom: 1px solid ${palette.gray[5]};
        `;
  }
};

const ItemBox = styled.div`
  font-weight: 300;
  height: 50px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${palette.gray[2]};
  align-items: center;
  margin-bottom: 4px;
  ${colStyle}

  > p {
    margin: 0;
  }
`;

const Name = styled.p`
  min-width: 280px;
`;

const Num = styled.p`
  min-width: 160px;
`;

const Address = styled.p`
    width: 100%;
`;
