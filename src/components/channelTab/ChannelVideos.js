import { useState } from "react";
import styled from "styled-components";

import { requestVideos } from "../../hooks/requestAxios";

import Loading from "../Loading";
import ChannelVideoItem from "../ChannelVideoItem";
import { Btn } from "../Button/CopyButton";

const ChannelVideos = (videoData) => {
  // 더보기 버튼 누르면 데이터 더 가져오는 함수
  console.log(videoData);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(videoData);
  const getMoreData = async () => {
    setLoading(true);
    try {
      const res = await requestVideos(videoData.id, list.nextPage);

      console.log(videoData.id, res.data);
      setList({
        result: list.result.concat(res.data.items),
        nextPage:
          res.data.items.length < 15 || !res.data.nextPageToken
            ? ""
            : res.data.nextPageToken,
        totalResults: videoData.totalResults,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(list);
  // list
  return (
    <div>
      <h4>동영상 · 전체 {videoData.totalResults}개</h4>

      <>
        <VideoRow>
          {list.result
            .filter((video) => video.contentDetails.upload !== undefined)
            .map((item, idx) => (
              <ChannelVideoItem {...item} key={idx} />
            ))}
        </VideoRow>
        {loading ? (
          <div
            style={{
              position: "relative",
              height: "120px",
              marginBottom: "50px",
            }}
          >
            <Loading />
          </div>
        ) : (
          <>
            {list.nextPage !== "" && (
              <BtnRow>
                <Btn onClick={getMoreData}>더보기</Btn>
              </BtnRow>
            )}
          </>
        )}
      </>
    </div>
  );
};
const VideoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0;
`;
const BtnRow = styled.div`
  display: flex;
  justify-content: center;
`;

export default ChannelVideos;
