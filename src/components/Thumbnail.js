import { useState } from "react";
import styled from "styled-components";

const Thumbnail = ({ width, height, url, title }) => {
  return (
    <div>
      <ThumbnailImg width={width} height={height} src={url} alt={title} />
    </div>
  );
};

const ThumbnailImg = styled.img`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 10px;
`;

export default Thumbnail;
