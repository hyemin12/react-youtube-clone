/** 숫자 변환기 (조회수 or 구독자 등)
 * 1000회 미만: 그대로 출력
 * 1000~ 10000 : 1000으로 나눈 값
 * 10000이상 : 10000으로 나눈 값
 */
export const converCount = (num) => {
  if (1000 > num) return `${num}회`;

  if (1000 < num && num < 10000)
    return num % 1000 === 0
      ? `${parseInt(num / 1000)}천`
      : `${(num / 1000).toFixed(1)}천`;

  if (num >= 10000)
    return num % 10000 === 0
      ? `${parseInt(num / 10000)}만`
      : `${(num / 10000).toFixed(1)}만`;
};
