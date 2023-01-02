import styled from "styled-components";

const UploadDate = ({ date }) => {
  const calcDate = () => {
    const today = new Date();
    const upload = new Date(date);

    const yearGap = today.getFullYear() - upload.getFullYear();
    const monthGap = today.getMonth() - upload.getMonth();
    const dateGap = today.getDate() - upload.getDate();
    const hoursGap = today.getHours() - upload.getHours();
    const minutesGap = today.getMinutes() - upload.getMinutes();
    const secGap = today.getSeconds() - upload.getSeconds();

    if (yearGap === 1 && dateGap < 7)
      return `${today.getDate() + 31 - upload.getDate()}일전`;
    if (0 < yearGap) return `${yearGap}년전`;
    if (0 < monthGap && monthGap < 12) return `${monthGap}달전`;
    if (8 <= dateGap && dateGap <= 31) return `${Math.floor(dateGap / 7)}주전`;
    if (0 < dateGap && dateGap < 8) return `${dateGap}일전`;
    if (0 < hoursGap) return `${hoursGap}시간전`;
    if (0 < minutesGap) return `${minutesGap}분전`;
    if (0 < secGap) return `${secGap}초전`;
  };
  return <P>{calcDate()}</P>;
};

const P = styled.p`
  margin: 0;
  padding: 2px 0;
  color: #777;
  font-size: 0.9em;
`;
export default UploadDate;
