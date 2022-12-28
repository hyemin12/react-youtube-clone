import { createContext, useContext, useState } from "react";

const MyContext = createContext();

// Provider
export const ContextProvier = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState();
  const value = { searchQuery, setSearchQuery };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
// custom hook
export const useSearchContext = () => {
  return useContext(MyContext);
};
