import { useState } from "react";

export const useTabs = (initialTab, tabs) => {
  console.log(initialTab, tabs);
  const [currentIdx, setCurrentIdx] = useState(initialTab);
  if (!tabs || Array.isArray(tabs)) {
    return;
  }

  return { currentTab: tabs[currentIdx], changeTab: setCurrentIdx };
};
