import styled from "styled-components";

import SubTitle from "./SubTitle";

const ViewUpload = ({ view, date, convert }) => {
  const calcDate = () => {
    const today = new Date();
    const upload = new Date(date);

    const yearGap = today.getFullYear() - upload.getFullYear();
    const monthGap = today.getMonth() - upload.getMonth();
    const dateGap = today.getDate() - upload.getDate();
    const hoursGap = today.getHours() - upload.getHours();
    const minutesGap = today.getMinutes() - upload.getMinutes();
    const secGap = today.getSeconds() - upload.getSeconds();

    // 업로드 날짜가 12월일 경우 날짜차로 계산
    if (yearGap === 1 && dateGap < 7 && upload.getMonth() + 1 === "12")
      return `${today.getDate() + 31 - upload.getDate()}일전`;
    if (0 < yearGap) return `${yearGap}년전`;
    if (0 < monthGap && monthGap < 12) return `${monthGap}달전`;
    if (8 <= dateGap && dateGap <= 31) return `${Math.floor(dateGap / 7)}주전`;
    if (0 < dateGap && dateGap < 8) return `${dateGap}일전`;
    if (0 < hoursGap) return `${hoursGap}시간전`;
    if (0 < minutesGap) return `${minutesGap}분전`;
    if (0 < secGap) return `${secGap}초전`;
  };
  return (
    <Row>
      <SubTitle text={`조회수 ${view}`} />
      <DateTitle>{convert ? calcDate(date) : date}</DateTitle>
    </Row>
  );
};
const Row = styled.div`
  display: flex;
  gap: 14px;
  position: relative;
`;
const DateTitle = styled.p`
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
