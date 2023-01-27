// 업로드 날짜 변환
export const today = new Date();

export const calcDate = (d) => {
  const upload = new Date(d);

  const todayT = today.getTime();
  const uploadT = upload.getTime();
  const timeGap = todayT - uploadT;

  const minUnit = 1000 * 60;
  const hourUnit = minUnit * 60;
  const dayUnit = hourUnit * 24;
  const monthUnit = dayUnit * 30;
  const yearUnit = dayUnit * 365;

  const mathFloor = (num) => {
    return Math.floor(num);
  };

  const minGap = mathFloor(timeGap / minUnit);
  const hourGap = mathFloor(timeGap / hourUnit);
  const dayGap = mathFloor(timeGap / dayUnit);
  const monthGap = mathFloor(timeGap / monthUnit);
  const yearGap = mathFloor(timeGap / yearUnit);

  if (yearGap > 0) return `${yearGap}년전`;
  if (monthGap > 0) return `${monthGap}달전`;
  if (dayGap > 0) return `${dayGap}일전`;
  if (hourGap > 0) return `${hourGap}시간전`;
  if (minGap > 0) return `${minGap}분전`;
  return `${timeGap / 1000}초전`;

  // 초 : 1000
  // 분 : 1000 * 60
  // 시 : 1000 * 60 * 60
  // 일 : 1000 * 60 * 60 * 24
  // 월 : 1000 * 60 * 60 * 24 * 30
  // 년 : 1000 * 60 * 60 * 24 * 365
};
