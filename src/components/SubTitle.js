import styled from "styled-components";

const SubTitle = ({ text }) => {
  return <Subtitle>{text}</Subtitle>;
};
const Subtitle = styled.p`
  margin: 0;
  padding: 2px 0;
  color: #777;
  font-size: 0.9em;
`;
export default SubTitle;
