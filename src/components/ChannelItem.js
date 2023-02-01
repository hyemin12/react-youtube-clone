import { useEffect, useState } from "react";
import styled from "styled-components";

import { requestChannel } from "../hooks/requestAxios";
import { convertCount } from "../hooks/convertCount";

import Row from "../components/FlexRow";
import ChannelThumbnail from "../components/ChannelThumbnail";
import ChannelTitle from "../components/ChannelTitle";
import SubTitle from "./SubTitle";

const ChannelItem = ({ item }) => {
  // console.log(item);
  const channelId = item.channelId;
  const [channelData, setChannelData] = useState({});
  const getChannelData = async () => {
    const res = await requestChannel(channelId);

    setChannelData({
      thumbnailUrl: res.data.items[0].snippet.thumbnails.medium.url,
      customUrl: res.data.items[0].snippet.customUrl,
      subscriberCount: res.data.items[0].statistics.subscriberCount,
    });
  };

  useEffect(() => {
    getChannelData();
  }, [item]);
  console.log(channelData);
  return (
    <ItemContainer>
      <Row gap={20} align={"center"}>
        <ImgContainer>
          <ChannelThumbnail
            customUrl={channelData.customUrl}
            channelId={channelId}
            title={item.title}
            url={channelData.thumbnailUrl}
            size={120}
          />
        </ImgContainer>
        <TextContainer>
          <ChannelTitle
            text={item.title}
            channelId={channelId}
            customUrl={channelData.customUrl}
            color={"#333"}
            size={"18px"}
          />

          <Row gap={14}>
            <SubTitle text={channelData.customUrl} />
            <Subscribe>{`${convertCount(
              channelData.subscriberCount
            )}명`}</Subscribe>
          </Row>
          <SubTitle text={item.description} cut={true} />
        </TextContainer>
      </Row>
    </ItemContainer>
  );
};
const ItemContainer = styled.div`
  margin-bottom: 20px;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 130px;
  // border: 1px solid #f1f1f1;
  // border-radius: 10px;
`;
const TextContainer = styled.div`
  line-height: 1.4;
`;
const Subscribe = styled.p`
  margin: 0;
  padding: 2px 0;
  color: #777;
  font-size: 0.9em;
  position: relative;
  &::before {
    content: "";
    width: 3px;
    height: 3px;
    background-color: #777;
    border-radius: 50%;
    position: absolute;
    top: 9px;
    left: -7px;
  }
`;

export default ChannelItem;
