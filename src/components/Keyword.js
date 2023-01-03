import { Link } from "react-router-dom";
import styled from "styled-components";

const Keywords = ({ index, setState }) => {
  const keywords = ["인기", "kpop", "게임", "요리", "배구", "축구"];
  return (
    <Row>
      {keywords.map((word, idx) => (
        <Keyword
          key={word}
          onClick={() => {
            setState(idx);
          }}
          className={idx === index ? "isActive" : ""}
        >
          <p># {word}</p>
        </Keyword>
      ))}
    </Row>
  );
};
const Row = styled.div`
  display: flex;
  gap: 12px;
`;
const Keyword = styled(Link)`
  display: block;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 30px;
  &:hover {
    background-color: #eee;
  }
  &.isActive {
    background-color: #555;
    color: #fff;
  }
`;
export default Keywords;
