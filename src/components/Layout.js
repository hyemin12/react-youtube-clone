import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Row from "./FlexRow";

const Layout = ({ children, aside }) => {
  return (
    <>
      <Container>
        <Header />
        <Row gap={20}>
          {aside && (
            <aside>
              <Nav />
            </aside>
          )}
          <MainContent>{children}</MainContent>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
const Container = styled.div`
  min-width: 1500px;
  padding: 16px 10px;
`;
const MainContent = styled.div`
  display: flex;
  gap: 20px;
`;

export default Layout;
