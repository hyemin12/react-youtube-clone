import styled from "styled-components";

import useAlert from "../hooks/useAlert";

import Logo from "./Logo";
import Search from "./Search";
import Alert from "./Alert";

const Header = () => {
  const [isAlert, setIsAlert] = useAlert();
  return (
    <HeaderContainer>
      <Logo />
      <Search />
      <LoginBtn
        onClick={() => {
          setIsAlert(true);
        }}
      >
        로그인
      </LoginBtn>
      {isAlert && <Alert position={"center"} text={"준비중인 서비스입니다."} />}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 26px;
  &:hover {
  }
`;
const LoginBtn = styled.p`
  cursor: pointer;
  &:hover {
    color: tomato;
  }
`;
export default Header;
