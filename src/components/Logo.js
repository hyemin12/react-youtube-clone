import { Link } from "react-router-dom";
import styled from "styled-components";
import YoutubeLogo from "../images/Youtube-logo.png";

const LogoImg = styled.img`
  width: 90px;
  height: 20px;
`;

const Logo = () => {
  return (
    <Link to="/">
      <LogoImg src={YoutubeLogo} alt="Youtube" />
    </Link>
  );
};
export default Logo;
