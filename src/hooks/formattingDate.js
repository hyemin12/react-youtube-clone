export const today = new Date();
// 업로드 날짜 변환
export const formattingDate = (d) => {
  const release = new Date(d);
  const formatting = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  const gap = release - today;

  const unitMin = 1000 * 60;
  const unitHour = 1000 * 60 * 60;
  const unitDay = 1000 * 60 * 60 * 24;
  const unitMonth = 1000 * 60 * 60 * 24 * 30;
  const unitYear = 1000 * 60 * 60 * 24 * 30 * 365;

  const mathFloor = (num) => {
    return Math.floor(num);
  };

  if (gap / unitYear <= -1)
    return formatting.format(mathFloor(gap / unitYear), "year");
  if (gap / unitMonth <= -1)
    return formatting.format(mathFloor(gap / unitMonth), "month");
  if (gap / unitDay <= -1)
    return formatting.format(mathFloor(gap / unitDay), "day");
  if (gap / unitHour <= -1)
    return formatting.format(mathFloor(gap / unitHour), "hour");
  if (gap / unitMin <= -1)
    return formatting.format(mathFloor(gap / unitMin), "minute");

  // 초 : 1000
  // 분 : 1000 * 60
  // 시 : 1000 * 60 * 60
  // 일 : 1000 * 60 * 60 * 24
  // 월 : 1000 * 60 * 60 * 24 * 30
  // 년 : 1000 * 60 * 60 * 24 * 365
};
