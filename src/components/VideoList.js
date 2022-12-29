import styled from "styled-components";

import VideoItem from "./VideoItem";

const VideoList = ({ videos }) => {
  return (
    <ListContainer>
      {videos.map((item) => (
        <VideoItem {...item} key={item.id} />
      ))}
    </ListContainer>
  );
};
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: calc(100vw - 150px);
  margin: 0 auto;
  padding: 20px 0;
`;

export default VideoList;
