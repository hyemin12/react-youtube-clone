import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SubTitle from "./SubTitle";
import Thumbnail from "./Thumbnail";
import ChannelThumbnail from "./ChannelThumbnail";
import Title from "./Title";

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
        <Thumbnail
          width={thumbnails.medium.width}
          height={thumbnails.medium.height}
          url={thumbnails.medium.url}
          title={title}
        />
        <VideoRow>
          <ChannelThumbnail url={channelImg} title={channelTitle} size={34} />

          <div>
            <Title size={16} text={title} mode={true} />
            <SubTitle text={channelTitle} />
            <SubTitle text={publishedAt.slice(0, 10)} />
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
