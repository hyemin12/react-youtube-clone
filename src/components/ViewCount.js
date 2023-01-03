import styled from "styled-components";

const ViewCount = ({ viewNum }) => {
  const calcNum = (n) => {
    if (n < 1000) return `${n}회`;
    if (n > 1000 && n < 10000) return `${parseInt(n / 1000)}천회 `;
    if (n > 10000) return `${parseInt(n / 10000)}만회 `;
  };
  return <P>조회수 {calcNum(viewNum)}</P>;
};

const P = styled.p`
  margin: 0;
  padding: 2px 0;
  color: #777;
  font-size: 0.9em;
`;

export default ViewCount;
