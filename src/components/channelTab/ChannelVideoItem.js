import { useState } from "react";
import styled from "styled-components";

import { convertCount } from "../../hooks/convertCount";
import useGetStatistics from "../../hooks/useGetStatistics";

import VideoThumbnail from "../VideoThumbnail";
import VideoTitle from "../VideoTitle";
import ViewUpload from "../ViewUpload";

// 채널페이지 동영상 아이템
const ChannelVideoItem = (item) => {
  let videoId;
  if (item.contentDetails.upload) {
    videoId = item.contentDetails.upload.videoId;
  } else if (item.contentDetails.playlistItem) {
    videoId = item.contentDetails.playlistItem.resourceId.videoId;
  } else {
    videoId = item.contentDetails.videoId;
  }

  const { thumbnails, title, publishedAt } = item.snippet;

  const [loading, setLoading] = useState(true);

  const { viewCount, duration } = useGetStatistics(videoId, setLoading);

  return (
    <>
      {!loading && (
        <ItemContainer width={"240"}>
          <VideoThumbnail
            width={"240px"}
            height={"135px"}
            url={thumbnails.medium.url}
            videoId={videoId}
            duration={duration}
          />
          <VideoTitle text={title} cut={true} videoId={videoId} />

          <ViewUpload
            view={convertCount(viewCount)}
            date={publishedAt}
            convert={true}
          />
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
