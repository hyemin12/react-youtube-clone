import { useLocation } from "react-router-dom";
import styled from "styled-components";

import LinkButton from "./Button/LinkButton";

const ChannelTitle = ({ customUrl, channelId, text, color, size }) => {
  const location = useLocation();
  if (location.pathname === "/channel") return <P>{text}</P>;
  console.log(channelId);
  return (
    <LinkButton
      pathname={"/channel"}
      query={customUrl ? customUrl : `${text}`}
      id={channelId}
    >
      <P color={color} size={size}>
        {text}
      </P>
    </LinkButton>
  );
};

const P = styled.p`
  padding: 2px 0;
  color: ${(props) => (props.color ? props.color : "#777")};
  font-size: ${(props) => (props.size ? props.size : "0.9em")};
`;
export default ChannelTitle;
