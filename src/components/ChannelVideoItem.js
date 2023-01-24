import { useEffect, useState } from "react";
import styled from "styled-components";

import { convertCount } from "../hooks/convertCount";
import { requestContentDetails } from "../hooks/requestAxios";

import LinkButton from "./Button/LinkButton";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import ViewUpload from "./ViewUpload";

const ChannelVideoItem = (item) => {
  const { videoId } = item.contentDetails.upload;

  const { thumbnails, title, publishedAt } = item.snippet;

  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState();

  // 영상 조회수, 영상 길이 얻어오기
  const getData = async () => {
    try {
      const res = await requestContentDetails(videoId);
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
        <ItemContainer width={"245"}>
          <LinkButton pathname={"/watch"} query={videoId}>
            <Thumbnail
              width="240px"
              height="135px"
              url={thumbnails.medium.url}
              duration={statsData.videolength}
            />
            <Title text={title} cut={true} />
            <ViewUpload
              view={convertCount(statsData.viewNum)}
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
