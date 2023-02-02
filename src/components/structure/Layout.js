import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Row from "../FlexRow";
import { useEffect, useRef, useState } from "react";

const Layout = ({ children, aside }) => {
  const [isShort, setIsShort] = useState(false);

  const htmlRef = useRef(null);
  const documentHeight = document.documentElement.clientHeight;
  useEffect(() => {
    if (htmlRef.current) {
      const htmlHeight = htmlRef.current.clientHeight;
      documentHeight > htmlHeight && setIsShort(true);
    }
  }, []);
  return (
    <>
      <Container ref={htmlRef}>
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
      <Footer isShort={isShort} />
    </>
  );
};
const Container = styled.div`
  min-width: 1500px;
  padding: 16px 30px;
  @media screen and (min-width: 1500px) {
    overflow-x: hidden;
  }
`;

export default Layout;
