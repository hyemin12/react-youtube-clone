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
          <div>{children}</div>
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

export default Layout;
