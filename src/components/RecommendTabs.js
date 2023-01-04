import { useState } from "react";
import styled from "styled-components";

import RecommendItem from "./RecommendItem";

const RecommendTabs = ({ data, id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoId = data.contentDetails ? data.contentDetails.upload : data.id;

  return (
    <div>
      {data.map(({ title }, idx) => (
        <RecomTitle
          key={title}
          className={currentIndex === idx ? "active" : ""}
          onClick={() => {
            setCurrentIndex(idx);
          }}
        >
          {title}
        </RecomTitle>
      ))}
      {data &&
        data[currentIndex].list
          .filter((a) => videoId !== id)
          .map((item) => (
            <RecommendItem
              item={item}
              channelTitle={item.snippet.channelTitle}
            />
          ))}
    </div>
  );
};
const RecomTitle = styled.p`
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
