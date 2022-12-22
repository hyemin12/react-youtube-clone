import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SubTitle from "./SubTitle";
import Thumbnail from "./Thumbnail";
import ChannelThumbnail from "./ChannelThumbnail";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const VideoItem = (item) => {
  const [loading, setLoading] = useState(true);
  const { thumbnails, title, channelTitle, channelId, publishedAt } =
    item.snippet;

  const [channelImg, setChannelImg] = useState();

  const getThumbnail = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${KEY}`
    );

    setChannelImg(res.data.items[0].snippet.thumbnails.default.url);
    setLoading(false);
  };
  useEffect(() => {
    getThumbnail();
  }, []);
  return (
    <>
      <Link to={item.id} style={{ width: `${thumbnails.medium.width}px` }}>
        <Thumbnail size={thumbnails.medium} title={title} loading={loading} />
        <VideoRow>
          <ChannelThumbnail url={channelImg} title={channelTitle} size={34} />

          <div>
            <Title>{title}</Title>
            <SubTitle text={channelTitle} color={"#777"} />
            <SubTitle text={publishedAt.slice(0, 10)} color={"#777"} />
          </div>
        </VideoRow>
      </Link>
    </>
  );
};

const Title = styled.h4`
  display: -webkit-box;
  padding: 0;
  margin-top: 0;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const VideoRow = styled.div`
  display: flex;
  gap: 14px;
  padding: 8px 4px;
`;

export default VideoItem;
