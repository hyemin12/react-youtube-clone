export const converCount = (num) => {
  if (num < 1000) return `${num}회`;

  if (num > 1000 && num < 10000)
    return num % 1000 === 0
      ? `${parseInt(num / 1000)}천`
      : `${(num / 1000).toFixed(1)}천`;

  if (num > 10000)
    return num % 10000 === 0
      ? `${parseInt(num / 10000)}만`
      : `${(num / 10000).toFixed(1)}만`;
};
