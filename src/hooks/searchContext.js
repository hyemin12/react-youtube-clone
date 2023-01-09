import { createContext, useContext, useState } from "react";

const MyContext = createContext();

/** 검색어, 검색 결과 전역관리 훅
 * q: 검색어 (input에 작성된 단어)
 * result: 받아온 데이터 (결과 목록)
 */
export const ContextProvier = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState({ q: "", result: [] });

  const value = { searchQuery, setSearchQuery };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useSearchContext = () => {
  return useContext(MyContext);
};
