import { useLocation } from "react-router-dom";
import styled from "styled-components";

import unknownImg from "../images/unknownChannel.png";
import LinkButton from "./Button/LinkButton";

// 채널 썸네일 - 이미지 컴포넌트
const ChannelThumbnail = ({ customUrl, channelId, title, url, size, type }) => {
  const location = useLocation();
  if (location.pathname === "/channel" || type === "default")
    return <Img src={url ? url : unknownImg} alt={title} size={size} />;
  return (
    <LinkButton pathname={"/channel"} query={customUrl} id={channelId}>
      <Img src={url ? url : unknownImg} alt={title} size={size} />
    </LinkButton>
  );
};

const Img = styled.img`
  width: ${(props) => (props.size ? props.size : 36)}px;
  height: ${(props) => (props.size ? props.size : 36)}px;

  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #f1f1f1;
`;

export default ChannelThumbnail;
