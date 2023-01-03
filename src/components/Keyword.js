import { Link } from "react-router-dom";
import styled from "styled-components";

const Keywords = ({ text }) => {
  const keywords = ["인기", "kpop", "음악", "게임", "요리", "배구", "축구"];
  return (
    <div>
      {keywords.map((word) => (
        <Keyword>
          <p>#{word}</p>
        </Keyword>
      ))}
    </div>
  );
};
const Keyword = styled(Link)`
  display: block;
  width: 84px;
  // background-color: #ccc;
  border: 1px solid #ddd;
  padding: 10px 20px;
  margin: 5px 0;
  border-radius: 30px;
  &:hover {
    background-color: #eee;
  }
`;
export default Keywords;
