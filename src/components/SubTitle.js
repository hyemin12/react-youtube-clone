import styled from "styled-components";

const SubTitle = ({ text }) => {
  return <P>{text}</P>;
};
const P = styled.p`
  margin: 0;
  padding: 2px 0;
  color: #777;
  font-size: 0.9em;
`;
export default SubTitle;
