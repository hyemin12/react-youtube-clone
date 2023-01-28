import styled from "styled-components";

import getViewNumVideoLength from "../../hooks/getViewNumVideoLength";

import LinkButton from "../Button/LinkButton";
import Description from "../Description";
import Row from "../FlexRow";
import Iframe from "../Iframe";
import Title from "../Title";
import ViewUpload from "../ViewUpload";
import ChannelVideoItem from "./ChannelVideoItem";

const ChannelHome = (data) => {
  // const recentVideo = videos.result[0];
  const { recent, videos } = data;
  console.log(videos);
  const recentVideoId = recent.contentDetails.upload
    ? recent.contentDetails.upload.videoId
    : recent.contentDetails.playlistItem.resourceId.videoId;

  const { statisticsData } = getViewNumVideoLength(recentVideoId);

  return (
    <div>
      {statisticsData && (
        <Row gap={30}>
          <Iframe
            id={recentVideoId}
            title={recent.snippet.title}
            width="640"
            height="360"
          />
          <div>
            <LinkButton pathname={"/watch"} query={recentVideoId}>
              <Title text={recent.snippet.title} size={18} />
            </LinkButton>
            <ViewUpload
              view={parseInt(statisticsData.viewNum).toLocaleString()}
              date={recent.snippet.publishedAt}
              convert={true}
            />

            <DesContainer>
              <Description des={recent.snippet.description} />
            </DesContainer>
            <LinkButton pathname={"/watch"} query={recentVideoId}>
              자세히보기...
            </LinkButton>
          </div>
        </Row>
      )}
      <Section>
        <Title text="동영상" size={18} />
        <VideoRow>
          {videos
            .filter((video) => video.contentDetails.upload !== undefined)
            .slice(1, 11)
            .map((video) => (
              <ChannelVideoItem {...video} key={video.etag} />
            ))}
        </VideoRow>
      </Section>
      <Section>
        <Title text="최근 업로드된 재생목록" size={18} />
      </Section>
    </div>
  );
};
const DesContainer = styled.div`
  flex-wrap: wrap;
  margin: 20px 0;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  position: relative;
`;
const Section = styled.div`
  margin-top: 10px;
  padding-top: 12px;
  // border-top: 1px solid #ccc;
`;

const VideoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0;
`;
export default ChannelHome;
