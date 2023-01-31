import styled from "styled-components";

import LinkButton from "./Button/LinkButton";

const VideoTitle = ({ videoId, text, size, margin, cut }) => {
  return (
    <LinkButton pathname={"/watch"} query={videoId}>
      <H4 size={size} margin={margin} className={cut ? "overflow" : ""}>
        {text.replace(/&#39;/g, "'").replace(/&quot;/g, "˝")}
      </H4>
    </LinkButton>
  );
};
const H4 = styled.h4`
  width: 100%;
  padding-top: 2px;
  font-size: ${(props) => (props.size ? props.size : 16)}px;
  margin: ${(props) => (props.margin ? props.margin : "0 0 8px 0")};

  &.overflow {
    flex-wrap: wrap;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
export default VideoTitle;
