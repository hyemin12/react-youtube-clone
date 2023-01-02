import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SubTitle from "./SubTitle";
import Thumbnail from "./Thumbnail";
import ChannelThumbnail from "./ChannelThumbnail";
import Title from "./Title";
import UploadDate from "./UploadDate";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const VideoItem = (item) => {
  const id = typeof item.id === "object" ? item.id.videoId : item.id;

  const { thumbnails, title, channelTitle, channelId, publishedAt } =
    item.snippet;

  const [channelImg, setChannelImg] = useState();

  const getThumbnail = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${KEY}`
    );

    setChannelImg(res.data.items[0].snippet.thumbnails.default.url);
  };
  useEffect(() => {
    getThumbnail();
  }, []);
  return (
    <>
      <Link
        to={{ pathname: "/watch", search: `${id}` }}
        style={{ width: `${thumbnails.medium.width}px` }}
      >
        <Thumbnail
          width={thumbnails.medium.width ? thumbnails.medium.width : 320}
          height={thumbnails.medium.height ? thumbnails.medium.height : 180}
          url={thumbnails.medium.url}
          title={title}
        />
        <VideoRow>
          <ChannelThumbnail url={channelImg} title={channelTitle} size={34} />

          <div>
            <Title size={16} text={title} mode={true} />
            <SubTitle text={channelTitle} />
            <UploadDate date={publishedAt.slice(0, 19)} />
          </div>
        </VideoRow>
      </Link>
    </>
  );
};

const VideoRow = styled.div`
  display: flex;
  gap: 14px;
  padding: 8px 4px;
`;

export default VideoItem;
