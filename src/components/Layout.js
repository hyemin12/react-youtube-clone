import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </Container>
  );
};
const Container = styled.div`
  min-width: 1500px;
`;
const MainContent = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 10px;
`;

export default Layout;
