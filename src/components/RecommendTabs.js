import { useState } from "react";
import styled from "styled-components";

import RecommendItem from "./RecommendItem";

// 추천 영상 목록 (리스트)
const RecommendTabs = ({ data, id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoId = data.contentDetails ? data.contentDetails.upload : data.id;

  return (
    <div>
      {data.map(({ title }, idx) => (
        <TabTitle
          key={title}
          className={currentIndex === idx ? "active" : ""}
          onClick={() => {
            setCurrentIndex(idx);
          }}
        >
          {title}
        </TabTitle>
      ))}
      {data &&
        data[currentIndex].list
          .filter(() => videoId !== id)
          .map((item) => (
            <RecommendItem
              key={item.snippet.title}
              item={item}
              channelTitle={item.snippet.channelTitle}
            />
          ))}
    </div>
  );
};
const TabTitle = styled.p`
  display: inline-block;
  background-color: #ddd;
  padding: 10px 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  &.active {
    background-color: #555;
    color: #fff;
  }
`;

export default RecommendTabs;
