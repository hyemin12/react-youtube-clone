import { useLocation } from "react-router-dom";
import styled from "styled-components";

import Aside from "./Aside";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      <Header />
      <MainContent>
        {location.pathname === "/" ||
          (location.pathname.includes("/results/search=") && <Aside />)}
        {children}
      </MainContent>
      <Footer />
    </div>
  );
};
const MainContent = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 10px;
`;

export default Layout;
