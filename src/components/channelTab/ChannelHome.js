import styled from "styled-components";
import LinkButton from "../Button/LinkButton";
import Description from "../Description";
import Row from "../FlexRow";
import Iframe from "../Iframe";
import Title from "../Title";

const ChannelHome = ({ videos }) => {
  const recentVideo = videos.result[0];

  const recentVideoId = recentVideo.contentDetails.playlistItem
    ? recentVideo.contentDetails.playlistItem.resourceId.videoId
    : recentVideo.contentDetails.upload.videoId;

  return (
    <div>
      <p>채널 홈</p>
      <Row gap={30}>
        <Iframe
          id={recentVideoId}
          title={recentVideo.snippet.title}
          width="640"
          height="360"
        />
        <div>
          <LinkButton pathname={"/watch"} query={recentVideoId}>
            <Title text={recentVideo.snippet.title} size={18} />
          </LinkButton>
          <DesContainer>
            <Description des={recentVideo.snippet.description} />
          </DesContainer>
          <LinkButton pathname={"/watch"} query={recentVideoId}>
            자세히보기...
          </LinkButton>
        </div>
      </Row>
    </div>
  );
};
const DesContainer = styled.div`
  flex-wrap: wrap;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  position: relative;
`;
export default ChannelHome;
