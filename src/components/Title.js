import styled from "styled-components";

const Title = ({ size, text, mode }) => {
  return (
    <H4 size={size} className={mode ? "overflow" : ""}>
      {text.replace(/&#39;/g, "'").replace(/&quot;/g, "˝")}
    </H4>
  );
};
const H4 = styled.h4`
  width: 100%;
  padding-top: 2px;
  font-size: ${(props) => props.size}px;
  &.overflow {
    flex-wrap: wrap;
    display: -webkit-box;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
export default Title;
