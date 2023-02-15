import styled from "styled-components";

import { convertCount } from "../hooks/convertCount";
import useGetStatistics from "../hooks/useGetStatistics";

import Row from "./FlexRow";
import VideoThumbnail from "./VideoThumbnail";
import VideoTitle from "./VideoTitle";
import SubTitle from "./SubTitle";
import ViewUpload from "./ViewUpload";
import SkeletonRecommendItem from "./skeletonUI/SkeletonRecommendItem";

// 추천 영상 (아이템)
const RecommendItem = ({ item, channelTitle, loading }) => {
  const { title, publishedAt, thumbnails } = item.snippet;

  let videoId;
  if (item.contentDetails.upload) {
    videoId = item.contentDetails.upload;
  } else if (item.contentDetails.playlistItem) {
    videoId = item.contentDetails.playlistItem.resourceId.videoId;
  } else if (item.contentDetails.videoId) {
    videoId = item.contentDetails.videoId;
  } else {
    videoId = item.id;
  }

  // const [loading, setLoading] = useState(true);

  const { viewCount, duration } = useGetStatistics(
    typeof videoId === "object" ? videoId.videoId : videoId
  );

  return (
    <>
      {loading ? (
        <SkeletonRecommendItem />
      ) : (
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
                  date={publishedAt.slice(0, 19)}
                  convert={true}
                />
              </ContentText>
            </Row>
          )}
        </Item>
      )}
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
