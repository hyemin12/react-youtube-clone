import styled from "styled-components";
import Logo from "./Logo";
import Search from "./Search";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <Search />
      <div style={{ width: "30px", height: "30px" }}></div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
`;
export default Header;
