import styled from "styled-components";

import VideoItem from "./VideoItemCol";

// 영상 목록 (리스트)
const VideoList = ({ videos, browserWidth }) => {
  return (
    <ListContainer>
      {videos.map((item) => (
        <VideoItem {...item} key={item.etag} browserWidth={browserWidth} />
      ))}
    </ListContainer>
  );
};
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: calc(100vw - 230px);
  margin: 0 auto;
  padding: 20px 0;
`;

export default VideoList;
