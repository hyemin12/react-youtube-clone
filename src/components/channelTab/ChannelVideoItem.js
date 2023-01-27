import { useState } from "react";
import styled from "styled-components";

import { convertCount } from "../../hooks/convertCount";
import useGetStatistics from "../../hooks/getViewNumVideoLength";

import LinkButton from "../Button/LinkButton";
import Thumbnail from "../Thumbnail";
import Title from "../Title";
import ViewUpload from "../ViewUpload";

// 채널페이지 동영상 아이템
const ChannelVideoItem = (item) => {
  const { videoId } = item.contentDetails.upload;

  const { thumbnails, title, publishedAt } = item.snippet;

  const [loading, setLoading] = useState(true);

  const { statisticsData } = useGetStatistics(videoId, setLoading);

  return (
    <>
      {!loading && statisticsData && (
        <ItemContainer width={"245"}>
          <LinkButton pathname={"/watch"} query={videoId}>
            <Thumbnail
              width="240px"
              height="135px"
              url={thumbnails.medium.url}
              duration={statisticsData.videoLength}
            />
            <Title text={title} cut={true} />
            <ViewUpload
              view={convertCount(statisticsData.viewNum)}
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
