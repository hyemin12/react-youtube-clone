import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaBroadcastTower } from "react-icons/fa";

import { converCount } from "../hooks/converCount";

import SubTitle from "./SubTitle";
import Thumbnail from "./Thumbnail";
import ChannelThumbnail from "./ChannelThumbnail";
import Title from "./Title";
import ViewUpload from "./ViewUpload";
import Loading from "./Loading";
import VideoLength from "./VideoLength";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

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
  const [channelImg, setChannelImg] = useState();
  const [ectData, setEctData] = useState();

  // 채널 썸네일 가져오는 함수
  const getData = async () => {
    try {
      // 채널 썸네일 가져오기
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${KEY}`
      );
      setChannelImg(res.data.items[0].snippet.thumbnails.default.url);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // 조회수, 영상길이 데이터가 넘어오지 않았을 때 데이터 가져오는 함수 (검색해서 가져온 데이터)
  const getAddData = async () => {
    if (item.kind === "youtube#video") return;
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=statistics,contentDetails&key=${KEY}`
      );
      setEctData(res.data.items[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAddData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Link
            to={{ pathname: "/watch", search: `${id}` }}
            style={{
              width: `${thumbnails.medium.width}px`,
            }}
          >
            <Thumbnail
              width={thumbnails.medium.width ? thumbnails.medium.width : 320}
              height={thumbnails.medium.height ? thumbnails.medium.height : 180}
              url={thumbnails.medium.url}
              title={title}
              duration={
                item.contentDetails.duration || ectData.contentDetails.duration
              }
            />

            <VideoRow>
              <ChannelThumbnail
                url={channelImg}
                title={channelTitle}
                size={34}
              />

              <div>
                <Title size={16} text={title} mode={true} />
                <SubTitle text={channelTitle} />

                <ViewUpload
                  view={converCount(
                    item.statistics.viewCount || ectData.statistics.viewCount
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
          </Link>
        </>
      )}
    </>
  );
};

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
