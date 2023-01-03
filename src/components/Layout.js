import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, aside }) => {
  return (
    <div>
      <Header />
      <MainContent>{children}</MainContent>
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
