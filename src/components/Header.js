import styled from "styled-components";
import Logo from "./Logo";
import Search from "./Search";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <Search />
      <LoginBtn>로그인</LoginBtn>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  &:hover {
  }
`;
const LoginBtn = styled.a`
  cursor:pointer &:hover {
    color: tomato;
  }
`;
export default Header;
