import styled from "styled-components";

import VideoItem from "./VideoItem";

const VideoList = ({ videos }) => {
  console.log(videos);
  return (
    <ListContainer>
      {videos.map((item) => {
        return <VideoItem {...item} />;
      })}
    </ListContainer>
  );
};
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: calc(100vw - 150px);
  max-width: 1500px;
  margin: 0 auto;
`;

export default VideoList;
