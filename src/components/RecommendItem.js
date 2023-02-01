import { useState } from "react";
import styled from "styled-components";

import { convertCount } from "../hooks/convertCount";
import useGetStatistics from "../hooks/useGetStatistics";

import Loading from "./Loading";
import Row from "./FlexRow";
import VideoThumbnail from "./VideoThumbnail";
import VideoTitle from "./VideoTitle";
import SubTitle from "./SubTitle";
import ViewUpload from "./ViewUpload";

// 추천 영상 (아이템)
const RecommendItem = ({ item, channelTitle }) => {
  const { title, publishedAt, thumbnails } = item.snippet;

  const videoId = item.contentDetails.upload
    ? item.contentDetails.upload.videoId
    : item.id;

  const [loading, setLoading] = useState(true);

  const { viewCount, duration } = useGetStatistics(videoId, setLoading);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Row gap={10}>
          <VideoThumbnail
            width="200px"
            height="112.5px"
            url={thumbnails.medium.url}
            title={title}
            videoId={videoId}
            duration={duration}
          />

          <ContentText>
            <VideoTitle text={title} videoId={videoId} cut={true} />

            <SubTitle text={channelTitle} />

            <ViewUpload
              view={convertCount(viewCount)}
              date={publishedAt.slice(0, 19)}
              convert={true}
            />
          </ContentText>
        </Row>
      )}
    </>
  );
};

const ContentText = styled.div`
  width: 180px;
  padding: 4px 0;
`;

export default RecommendItem;
