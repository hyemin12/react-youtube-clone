import styled from "styled-components";

import { convertCount } from "../hooks/convertCount";
import useGetStatistics from "../hooks/useGetStatistics";
import useGetVideoId from "../hooks/useGetVideoId";

import Row from "./FlexRow";
import VideoThumbnail from "./VideoThumbnail";
import VideoTitle from "./VideoTitle";
import SubTitle from "./SubTitle";
import ViewUpload from "./ViewUpload";

// 추천 영상 (아이템)
const RecommendItem = ({ item, channelTitle, loading, mainVideoId }) => {
  const { title, publishedAt, thumbnails } = item.snippet;

  const videoId = useGetVideoId(item);

  const { viewCount, duration } = useGetStatistics(videoId);

  return (
    <>
      <Item>
        {viewCount && (
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
                date={publishedAt}
                convert={true}
              />
            </ContentText>
          </Row>
        )}
      </Item>
    </>
  );
};

const Item = styled.div`
  margin-bottom: 10px;
  position: relative;
`;

const ContentText = styled.div`
  width: 180px;
  padding: 4px 0;
`;

export default RecommendItem;
