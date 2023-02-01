import styled from "styled-components";
import LinkButton from "./Button/LinkButton";
import VideoLength from "./VideoLength";

/** 영상 썸네일
 * 사이즈
 * default: {width: "120", height: "90" }
 * medium: { width: "320", height: "180" }
 * high: {  width: "480", height: "360" }
 * standard: {  width: "640", height: "480" }
 * maxres: {  width: "1280", height: "720" }
 *  */
const VideoThumbnail = ({ width, height, url, title, duration, videoId }) => {
  return (
    <LinkButton pathname={"/watch"} query={videoId}>
      <div style={{ position: "relative" }}>
        <Img width={width} height={height} src={url} alt={title} />
        {duration && <VideoLength time={duration} />}
      </div>
    </LinkButton>
  );
};

const Img = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
`;

export default VideoThumbnail;
