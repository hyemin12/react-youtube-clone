import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { converCount } from "../hooks/converCount";
import LinkButton from "./LinkButton";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import ViewUpload from "./ViewUpload";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const ChannelVideoItem = (item) => {
  const { videoId } = item.contentDetails.upload;
  const { thumbnails, title, publishedAt } = item.snippet;

  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState();

  const getData = async () => {
    try {
      const res =
        await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=statistics,contentDetails&key=${KEY}
    `);
      // console.log(res.data.items[0]);
      setStatsData({
        viewNum: res.data.items[0].statistics.viewCount,
        videolength: res.data.items[0].contentDetails.duration,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [videoId]);
  return (
    <>
      {!loading && (
        <ItemContainer width={`245`}>
          <LinkButton pathname={"/watch"} query={videoId}>
            <Thumbnail
              width={245}
              height={245 * (9 / 16)}
              url={thumbnails.medium.url}
              duration={statsData.videolength}
            />
            <Title text={title} cut={true} />
            <ViewUpload
              view={converCount(statsData.viewNum)}
              date={publishedAt.slice(0, 19)}
              convert={true}
            />
          </LinkButton>
        </ItemContainer>
      )}
    </>
  );
};

const ItemContainer = styled.div`
  width: ${(props) => props.width}px;
  margin-bottom: 40px;
`;
export default ChannelVideoItem;
