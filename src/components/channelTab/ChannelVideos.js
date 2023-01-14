import { useState } from "react";
import { requestVideos } from "../../hooks/requestAxios";

import ChannelVideoItem from "../ChannelVideoItem";
import { Btn } from "../Button";
import styled from "styled-components";
import Loading from "../Loading";

const ChannelVideos = (videoData, { id }) => {
  // 더보기 버튼 누르면 데이터 더 가져오는 함수
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(videoData);
  const getMoreData = async () => {
    setLoading(true);
    try {
      const res = await requestVideos(id, videoData.nextPage);

      setList({
        result: [...videoData.result].concat(res.data.items),
        nextPage: res.data.items.length < 15 ? "" : res.data.nextPageToken,
        totalResults: videoData.totalResults,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // list
  return (
    <div>
      <h4>동영상 · 전체 {videoData.totalResults}개</h4>
      {loading ? (
        <Loading />
      ) : (
        <>
          <VideoRow>
            {videoData.result.map((item, idx) => (
              <ChannelVideoItem {...item} key={idx} />
            ))}
          </VideoRow>
          {!videoData.nextPage && <Btn onClick={getMoreData}>더보기</Btn>}
        </>
      )}
    </div>
  );
};
const VideoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default ChannelVideos;
