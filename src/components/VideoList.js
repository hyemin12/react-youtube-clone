import styled from "styled-components";

import SkeletonVideo from "./skeletonUI/SkeletonVideo";
import VideoItem from "./VideoItemCol";

// 영상 목록 (리스트)
const VideoList = ({ videos, loading }) => {
  return (
    <ListContainer>
      {loading ? (
        Array(32)
          .fill()
          .map(() => <SkeletonVideo />)
      ) : (
        <>
          {videos.map((item) => (
            <VideoItem {...item} key={item.etag} loading={loading} />
          ))}
        </>
      )}
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
