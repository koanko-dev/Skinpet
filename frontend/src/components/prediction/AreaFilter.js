import React, { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../lib/styles/palette";
import {
  sido_list,
  seoul_gu_list,
  kk_gu_list,
} from "../../lib/resources/filterResources";
import Button from "../UI/Button";

const AreaFilter = ({onFilter}) => {
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [sigunguList, setSigunguList] = useState(seoul_gu_list);

  useEffect(() => {
    setSigungu("")
    if (sido === "서울특별시") {
      setSigunguList(seoul_gu_list);
    } else if (sido === "경기도") {
      setSigunguList(kk_gu_list);
    }
  }, [sido]);

  const sidoFilterData = {
    name: "sido",
    defaultText: "시/도 선택",
    optionValues: sido_list,
    optionLabel: sido_list,
  };

  const sigunguFilterData = {
    name: "sigungu",
    defaultText: "시/군/구 선택",
    optionValues: sigunguList,
    optionLabel: sigunguList,
  };

  const sidoChangeHanlder = (e) => {
    setSido(e.target.value);
  };

  const sigunguChangeHanlder = (e) => {
    setSigungu(e.target.value);
  };

  return (
    <FilterBox>
      <SelectEl
        name={sidoFilterData.name}
        key={sidoFilterData.name}
        value={sido}
        onChange={sidoChangeHanlder}
      >
        <option value="">{sidoFilterData.defaultText}</option>
        {sidoFilterData.optionValues.map((optionValue, index) => {
          return (
            <option key={optionValue} value={optionValue}>
              {sidoFilterData.optionLabel[index]}
            </option>
          );
        })}
      </SelectEl>
      <SelectEl
        name={sigunguFilterData.name}
        key={sigunguFilterData.name}
        value={sigungu}
        onChange={sigunguChangeHanlder}
      >
        <option value="">{sigunguFilterData.defaultText}</option>
        {sigunguFilterData.optionValues.map((optionValue, index) => {
          return (
            <option key={optionValue} value={optionValue}>
              {sigunguFilterData.optionLabel[index]}
            </option>
          );
        })}
      </SelectEl>
      <Button theme='basic' onClick={() => onFilter(sido, sigungu)}>Search</Button>
    </FilterBox>
  );
};

export default AreaFilter;

const FilterBox = styled.div`
  display: flex;
`;

const SelectEl = styled.select`
  flex: 1;
  margin: 0 2px;
  height: calc(1.5em + 0.75rem + 2px);
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background-color: white;
  border: 1px solid ${palette.gray[3]};
  border-radius: 2rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: ${palette.gray[7]};

  &:focus {
    outline: none;
    border-color: ${palette.green[1]};
    box-shadow: 0 0 0 0.1rem rgba(19, 156, 78, 0.2);
  }
  &::placeholder {
    color: ${palette.gray[5]};
  }
`;
