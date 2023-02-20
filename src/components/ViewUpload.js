import styled from "styled-components";

import { formattingDate } from "../hooks/formattingDate";

import Row from "./FlexRow";
import SubTitle from "./SubTitle";

// 조회수·업로드 날짜 컴포넌트
// convert : 업로드 날짜 변환 여부
const ViewUpload = ({ view, date, convert }) => {
  return (
    <Row gap={14}>
      <SubTitle text={`조회수 ${view}`} />
      <DateTitle>
        {convert ? formattingDate(date) : date.slice(0, 16)}
      </DateTitle>
    </Row>
  );
};

export const DateTitle = styled.p`
  margin: 0;
  padding: 2px 0;
  color: #777;
  font-size: 0.9em;
  position: relative;
  &::before {
    content: "";
    width: 3px;
    height: 3px;
    background-color: #777;
    border-radius: 50%;
    position: absolute;
    top: 9px;
    left: -7px;
  }
`;
export default ViewUpload;
