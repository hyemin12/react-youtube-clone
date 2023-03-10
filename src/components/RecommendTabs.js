import React, { useState } from "react";
import styled from "styled-components";

import RecommendItem from "./RecommendItem";
import SkeletonRecommendItem from "./skeletonUI/SkeletonRecommendItem";

// 추천 영상 목록 (리스트)
const RecommendTabs = ({ recommendList, id, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="recommend">
      {/* 탭 메뉴 */}
      {recommendList.map(({ title, list }, idx) => (
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

      {/* 영상목록 */}
      {loading ? (
        Array(5)
          .fill()
          .map((item, idx) => <SkeletonRecommendItem key={idx} />)
      ) : (
        <>
          {recommendList &&
            recommendList[currentIndex].list
              .filter(
                (item) =>
                  (item.contentDetails.upload
                    ? item.contentDetails.upload.videoId
                    : item.id) !== id
              )
              .map((item) => (
                <RecommendItem
                  key={item.etag}
                  item={item}
                  channelTitle={item.snippet.channelTitle}
                  loading={loading}
                  mainVideoId={id}
                />
              ))}
        </>
      )}
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
