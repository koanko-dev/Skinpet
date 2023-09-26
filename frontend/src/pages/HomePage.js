import React, { useEffect, useState } from "react";

import styled from "styled-components";
import HomeFirstSection from "../components/home/HomeFirstSection";
import HomeSecondSection from "../components/home/HomeSecondSection";

const HomePage = () => {
  return (
    <HomePageBox>
      <HomeFirstSection />
      <HomeSecondSection />
    </HomePageBox>
  );
};

export default HomePage;

const HomePageBox = styled.div``;
