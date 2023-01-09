import { createContext, useContext, useState } from "react";

const channelIdContext = createContext();

// 채널 페이지에서 정보를 가져오기 위해 필요한 채널 아이디를 전역으로 관리하기 위한 훅
// ChannelTitle, ChannelThumbnail 컴포넌트에서 사용
export const ChannelIdContextProvider = ({ children }) => {
  const [settingId, setSettingId] = useState("");

  const value = { settingId, setSettingId };

  return (
    <channelIdContext.Provider value={value}>
      {children}
    </channelIdContext.Provider>
  );
};

export const useSetChnIdContext = () => {
  return useContext(channelIdContext);
};
