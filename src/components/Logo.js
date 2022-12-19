import styled from "styled-components";
import YoutubeLogo from "../images/Youtube-logo.png";

const LogoImg = styled.img`
  width: 90px;
  height: 20px;
`;

const Logo = () => {
  return (
    <a href="/">
      <LogoImg src={YoutubeLogo} alt="Youtube" />
    </a>
  );
};
export default Logo;
