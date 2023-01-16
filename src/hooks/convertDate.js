// 업로드 날짜 변환
export const calcDate = (d) => {
  const today = new Date();
  const upload = new Date(d);

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
