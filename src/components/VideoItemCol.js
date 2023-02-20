import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  requestChannelThumb,
  requestContentDetails,
} from "../hooks/requestAxios";
import { convertCount } from "../hooks/convertCount";

import VideoTitle from "./VideoTitle";
import ChannelThumbnail from "./ChannelThumbnail";
import ChannelTitle from "./ChannelTitle";
import ViewUpload from "./ViewUpload";
import VideoThumbnail from "./VideoThumbnail";

// 영상 아이템 - 세로
const VideoItemCol = (item) => {
  const videoId = typeof item.id === "object" ? item.id.videoId : item.id;

  const { thumbnails, title, channelTitle, channelId, publishedAt } =
    item.snippet;

  const [channel, setChannel] = useState({ thumbnail: "", customUrl: "" });

  const [statisticsData, setStatisticData] = useState();

  // 채널 썸네일 가져오기
  const getData = async () => {
    try {
      const res = await requestChannelThumb(channelId);
      setChannel({
        thumbnail: res.data.items[0].snippet.thumbnails.default.url,
        customUrl: res.data.items[0].snippet.customUrl,
      });

      // 조회수, 영상길이 데이터가 넘어오지 않았을 때 데이터 가져오는 함수 (검색해서 가져온 데이터)
      if (item.kind === "youtube#searchResult") {
        const res = await requestContentDetails(videoId);

        setStatisticData({
          viewCount: res.data.items[0].statistics.viewCount,
          duration: res.data.items[0].contentDetails.duration,
        });
      }
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [channelId]);

  /** 브라우저 크기가 변하면 item 크기 변경시키기 */
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  const windowResize = () => {
    window.innerWidth < 1499
      ? setBrowserWidth(1500)
      : setBrowserWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", windowResize);
    return () => window.removeEventListener("resize", windowResize);
  }, []);

  const itemWidth = (browserWidth - 296) / 4;

  return (
    <>
      {channel && (
        <ItemContainer width={itemWidth}>
          <VideoThumbnail
            width={"100%"}
            height={"100%"}
            url={thumbnails.medium.url}
            title={title}
            videoId={videoId}
            duration={
              statisticsData
                ? statisticsData.duration
                : item.contentDetails.duration
            }
          />

          <VideoRow>
            <ChannelThumbnail
              customUrl={channel.customUrl}
              channelId={channelId}
              url={channel.thumbnail}
              title={channelTitle}
            />

            <div>
              <VideoTitle videoId={videoId} size={16} text={title} cut={true} />
              <ChannelTitle
                channelId={channelId}
                text={channelTitle}
                customUrl={channel.customUrl}
              />
              <ViewUpload
                view={convertCount(
                  statisticsData
                    ? statisticsData.viewCount
                    : item.statistics.viewCount
                )}
                date={publishedAt}
                convert={true}
              />
            </div>
          </VideoRow>
        </ItemContainer>
      )}
    </>
  );
};
const ItemContainer = styled.div`
  width: ${(props) => props.width}px;
`;
const VideoRow = styled.div`
  display: flex;
  gap: 14px;
  padding: 8px 4px;
`;

export default React.memo(VideoItemCol);
