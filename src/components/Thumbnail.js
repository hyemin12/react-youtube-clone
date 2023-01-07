import styled from "styled-components";
import VideoLength from "./VideoLength";

const Thumbnail = ({ width, height, url, title, duration }) => {
  return (
    <div style={{ position: "relative" }}>
      <Img width={width} height={height} src={url} alt={title} />
      <VideoLength time={duration} />
    </div>
  );
};

const Img = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 10px;
`;

export default Thumbnail;
