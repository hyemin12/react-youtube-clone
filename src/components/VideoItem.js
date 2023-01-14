import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaBroadcastTower } from "react-icons/fa";

import { converCount } from "../hooks/converCount";

import Loading from "./Loading";
import Thumbnail from "./Thumbnail";
import LinkButton from "./LinkButton";
import Title from "./Title";
import SubTitle from "./SubTitle";
import ChannelThumbnail from "./ChannelThumbnail";
import ViewUpload from "./ViewUpload";
import {
  requestChannelThumb,
  requestContentDetails,
} from "../hooks/requestAxios";

// 영상목록 - 영상 (아이템)
const VideoItem = (item) => {
  const id = typeof item.id === "object" ? item.id.videoId : item.id;

  const {
    thumbnails,
    title,
    channelTitle,
    channelId,
    publishedAt,
    liveBroadcastContent,
  } = item.snippet;

  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState({ thumbnail: "", customUrl: "" });
  const [ectData, setEctData] = useState();

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
        const res = await requestContentDetails(id);

        setEctData({
          viewCount: res.data.items[0].statistics.viewCount,
          duration: res.data.items[0].contentDetails.duration,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [channelId]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ItemContainer width={`${thumbnails.medium.width}`}>
          <LinkButton pathname={"/watch"} query={id}>
            <Thumbnail
              width={thumbnails.medium.width ? thumbnails.medium.width : 320}
              height={thumbnails.medium.height ? thumbnails.medium.height : 180}
              url={thumbnails.medium.url}
              title={title}
              duration={
                ectData ? ectData.duration : item.contentDetails.duration
              }
            />
          </LinkButton>

          <VideoRow>
            <LinkButton
              pathname={"/channel"}
              query={channel.customUrl}
              id={channelId}
            >
              <ChannelThumbnail
                url={channel.thumbnail}
                title={channelTitle}
                size={34}
              />
            </LinkButton>
            <div>
              <LinkButton pathname={"/watch"} query={id}>
                <Title size={16} text={title} cut={true} />{" "}
              </LinkButton>
              <LinkButton pathname={"/channel"} query={id}>
                <SubTitle text={channelTitle} />
              </LinkButton>
              <ViewUpload
                view={converCount(
                  ectData ? ectData.viewCount : item.statistics.viewCount
                )}
                date={publishedAt.slice(0, 19)}
                convert={true}
              />
              {/* 실시간 배지 */}
              {liveBroadcastContent === "live" && (
                <Live>
                  <FaBroadcastTower />
                  실시간
                </Live>
              )}
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
const Live = styled.p`
  padding: 10px 20px;
  background-color: tomato;
`;

export default React.memo(VideoItem);
