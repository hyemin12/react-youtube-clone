// 검색 Context API
import { createContext, useContext, useState } from "react";

const channelIdContext = createContext();

// Provider
export const ChannelIdContextProvider = ({ children }) => {
  // 채널페이지에서 정보를 가져오기 위해 필요한 채널 아이디 state
  const [settingId, setSettingId] = useState("");

  const value = { settingId, setSettingId };

  return (
    <channelIdContext.Provider value={value}>
      {children}
    </channelIdContext.Provider>
  );
};

// custom hook
export const useSetChnIdContext = () => {
  return useContext(channelIdContext);
};
