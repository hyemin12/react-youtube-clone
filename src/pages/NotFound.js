import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <h2>알 수 없는 페이지 입니다.</h2>
      <LinkBtn to="/">메인페이지로 이동하기</LinkBtn>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
const LinkBtn = styled(Link)`
  background-color: #ccc;
  padding: 10px 20px;
  margin-top: 8px;
  border-radius: 10px;
`;
export default NotFound;
