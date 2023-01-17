import React, { useState } from "react";
import styled from "styled-components";

import RecommendItem from "./RecommendItem";

// 추천 영상 목록 (리스트)
const RecommendTabs = ({ data, id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="recommend">
      {/* 탭 메뉴 */}
      {data.map(({ title, list }, idx) => (
        <>
          {list.length > 0 && (
            <TabTitle
              key={title}
              className={currentIndex === idx ? "active" : ""}
              onClick={() => {
                setCurrentIndex(idx);
              }}
            >
              {title}
            </TabTitle>
          )}
        </>
      ))}
      "[안방1열 풀캠4K] 뉴진스 'OMG' (NewJeans FullCam)│@SBS Inkigayo
      230115\n\n#인기가요 #뉴진스 #NewJeans_OMG
      \n--------------------------------------------------------------------------------------\n\n☞
      MORE ＂SBS KPOP＂\n\nTwitter : https://twitter.com/kpop_sbs\nFacebook :
      https://www.facebook.com/sbskpop\nInstagram :
      https://instagram.com/sbskpop_official"
      {/* 영상목록 */}
      {data &&
        data[currentIndex].list
          .filter(
            (item) =>
              (item.contentDetails.upload
                ? item.contentDetails.upload.videoId
                : item.id) !== id
          )
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

export default React.memo(RecommendTabs);
