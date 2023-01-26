import { today } from "./convertDate";

// 시청기록 로컬스토지에 저장하는 함수
export const recordHistory = (videoId) => {
  const storageHistory = localStorage.getItem("YT_History")
    ? JSON.parse(localStorage.getItem("YT_History"))
    : [];

  const now = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;

  const newHistoryArr = storageHistory
    .concat({ date: now, id: videoId })
    .filter(
      (element, i) =>
        storageHistory.findIndex((element2) => element.id === element2.id) === i
    );

  localStorage.setItem("YT_History", JSON.stringify(newHistoryArr));
};
