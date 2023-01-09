import styled from "styled-components";

import SubTitle from "./SubTitle";

// 조회수·업로드 날짜 컴포넌트
const ViewUpload = ({ view, date, convert }) => {
  // 업로드 날짜 변환
  const calcDate = () => {
    const today = new Date();
    const upload = new Date(date);

    const yGap = today.getFullYear() - upload.getFullYear();
    const mGap = today.getMonth() - upload.getMonth();
    const dGap = today.getDate() - upload.getDate();
    const hGap = today.getHours() - upload.getHours();
    const minGap = today.getMinutes() - upload.getMinutes();
    const secGap = today.getSeconds() - upload.getSeconds();

    // 업로드 날짜가 12월일 경우 날짜차로 계산
    if (yGap === 1 && dGap < 7 && upload.getMonth() + 1 === "12")
      return `${today.getDate() + 31 - upload.getDate()}일전`;
    if (0 < yGap) return `${yGap}년전`;
    if (0 < mGap && mGap < 12) return `${mGap}달전`;
    if (8 <= dGap && dGap <= 31) return `${Math.floor(dGap / 7)}주전`;
    if (0 < dGap && dGap < 8) return `${dGap}일전`;
    if (0 < hGap) return `${hGap}시간전`;
    if (0 < minGap) return `${minGap}분전`;
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
