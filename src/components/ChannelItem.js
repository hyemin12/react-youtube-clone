import styled from "styled-components";
import { convertCount } from "../hooks/convertCount";
import ChannelThumbnail from "./ChannelThumbnail";
import Title from "./Title";

const ChannelItem = ({ data }) => {
  const { thumbnail, title, customUrl, subscriberCount } = data;
  return (
    <Row>
      <ChannelThumbnail
        url={thumbnail.default.url}
        ize={thumbnail.default.width}
        alt={title}
        customUrl={customUrl}
      />
      <div>
        <Title size={24} text={title} cut={false} />

        <P>{customUrl}</P>
        <P>구독자 {convertCount(subscriberCount)}</P>
      </div>
    </Row>
  );
};
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
`;
const P = styled.p`
  color: #555;
  font-size: 1em;
`;

export default ChannelItem;
