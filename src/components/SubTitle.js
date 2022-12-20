import styled from "styled-components";

const SubTitle = ({ text, color }) => {
  return <Subtitle style={{ color: `${color}` }}>{text}</Subtitle>;
};
const Subtitle = styled.p`
  margin: 0;
  padding: 2px 0;
  font-size: 0.9em;
`;
export default SubTitle;
