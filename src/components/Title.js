import styled from "styled-components";

const Title = ({ size, text }) => {
  console.log(text);
  return <H4 size={size}>{text}</H4>;
};
const H4 = styled.h4`
  font-size: ${(props) => props.size}px;
`;
export default Title;
