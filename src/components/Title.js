import styled from "styled-components";

const Title = ({ size, text, mode }) => {
  return (
    <H4 size={size} className={mode ? "overflow" : ""}>
      {text}
    </H4>
  );
};
const H4 = styled.h4`
  padding-top: 12px;
  font-size: ${(props) => props.size}px;
  &.overflow {
    display: -webkit-box;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
export default Title;
