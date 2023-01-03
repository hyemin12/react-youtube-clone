import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { converCount } from "../hooks/converCount";

import SubTitle from "./SubTitle";
import Thumbnail from "./Thumbnail";
import ChannelThumbnail from "./ChannelThumbnail";
import Title from "./Title";
import ViewUpload from "./ViewUpload";
import Loading from "./Loading";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const VideoItem = (item) => {
  const id = typeof item.id === "object" ? item.id.videoId : item.id;

  const { thumbnails, title, channelTitle, channelId, publishedAt } =
    item.snippet;

  const [loading, setLoading] = useState(true);
  const [channelImg, setChannelImg] = useState();
  const [viewNum, setViewNum] = useState();

  /** 채널 썸네일 가져오고, 조회수가 없이 데이터가 넘어왔을 경우 조회수 정보 가져오는 함수 실행 */
  const getData = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${KEY}`
      );
      setChannelImg(res.data.items[0].snippet.thumbnails.default.url);
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
              <Thumbnail
                width={thumbnails.medium.width ? thumbnails.medium.width : 320}
                height={
                  thumbnails.medium.height ? thumbnails.medium.height : 180
                }
                url={thumbnails.medium.url}
                title={title}
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
                    view={converCount(viewNum)}
                    date={publishedAt.slice(0, 19)}
                    convert={true}
                  />
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

export default VideoItem;
