import { useEffect, useState } from "react";
import styled from "styled-components";
import SubTitle from "../SubTitle";

const Footer = ({ isShort }) => {
  const year = new Date().getFullYear();
  console.log(isShort);
  // let documentHeight;
  // let htmlHeight;
  // const documentHeight = document.documentElement.clientHeight;
  // const htmlHeight = document.activeElement.clientHeight;

  return (
    <FooterContainer className={isShort ? "short" : " "}>
      <SubTitle text={"본 페이지는 공부용으로 제작된 페이지입니다."} />
      <SubTitle text={`copyright ${year}. Hyemin`} />
    </FooterContainer>
  );
};
const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #eee;
  padding: 40px 0;
  &.short {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export default Footer;
