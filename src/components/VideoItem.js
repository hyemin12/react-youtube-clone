import { useEffect, useState } from "react";
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
  const [viewNum, setViewNum] = useState();

  /** 채널 썸네일 가져오고, 조회수가 없이 데이터가 넘어왔을 경우 조회수 정보 가져오는 함수 실행 */
  const getData = async () => {
    try {
      // 채널 썸네일 가져오기
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${KEY}`
      );
      setChannelImg(res.data.items[0].snippet.thumbnails.default.url);

      // 영상 조회수가 없이 데이터가 넘어왔을 경우 조회수 정보 가져오기
      if (item.statistics === undefined) {
        const countRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=statistics&key=${KEY}`
        );
        setViewNum(countRes.data.items[0].statistics.viewCount);
      } else {
        setViewNum(item.statistics.viewCount);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {viewNum !== undefined && (
            <Link
              to={{ pathname: "/watch", search: `${id}` }}
              style={{
                width: `${thumbnails.medium.width}px`,
              }}
            >
              <div style={{ position: "relative" }}>
                <Thumbnail
                  width={
                    thumbnails.medium.width ? thumbnails.medium.width : 320
                  }
                  height={
                    thumbnails.medium.height ? thumbnails.medium.height : 180
                  }
                  url={thumbnails.medium.url}
                  title={title}
                />
                <VideoLength time={item.contentDetails.duration} />
              </div>
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
                    view={converCount(viewNum)}
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
          )}
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

export default VideoItem;
