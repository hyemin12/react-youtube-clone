import styled from "styled-components";

// cut : 2줄 이상일 경우 말 줄임 여부
const SubTitle = ({ text, cut }) => {
  return <P className={cut && "overflow"}>{text}</P>;
};
const P = styled.p`
  margin: 0;
  padding: 2px 0;
  color: #777;
  font-size: 0.9em;
  &.overflow {
    flex-wrap: wrap;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
export default SubTitle;
