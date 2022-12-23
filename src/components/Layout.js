import { useLocation } from "react-router-dom";
import styled from "styled-components";

import Aside from "./Aside";
import Header from "./Header";

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div>
      <Header />
      <MainContent>
        {location.pathname === "/" && <Aside />}
        {children}
      </MainContent>
    </div>
  );
};
const MainContent = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 10px;
`;

export default Layout;
