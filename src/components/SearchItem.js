import { useEffect, useState } from "react";
import styled from "styled-components";
import { convertCount } from "../hooks/convertCount";
import {
  requestChannelThumb,
  requestContentDetails,
} from "../hooks/requestAxios";
import ChannelThumbnail from "./ChannelThumbnail";
import Loading from "./Loading";
import Row from "./FlexRow";
import SubTitle from "./SubTitle";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import ViewUpload from "./ViewUpload";

const SearchItem = (data) => {
  const { videoId } = data.id;
  const {
    thumbnails,
    title,
    channelTitle,
    channelId,
    publishedAt,
    description,
  } = data.snippet;

  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState({ thumbnail: "", customUrl: "" });

  const [ectData, setEctData] = useState();
  console.log(channel);
  // 채널 썸네일 가져오기
  const getData = async () => {
    try {
      const channelRes = await requestChannelThumb(channelId);

      setChannel({
        thumbnail: channelRes.data.items[0].snippet.thumbnails.default.url,
        customUrl: channelRes.data.items[0].snippet.customUrl,
      });

      const CountRes = await requestContentDetails(videoId);

      setEctData({
        viewCount: CountRes.data.items[0].statistics.viewCount,
        duration: CountRes.data.items[0].contentDetails.duration,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, [channelId]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ItemContainer>
          <Row gap={20}>
            <Thumbnail
              width={thumbnails.medium.width ? thumbnails.medium.width : 320}
              height={thumbnails.medium.height ? thumbnails.medium.height : 180}
              url={thumbnails.medium.url}
              title={title}
              duration={ectData.duration}
            />
            <div>
              <Title text={title} />
              <ViewUpload
                view={convertCount(ectData.viewCount)}
                date={publishedAt}
                convert={true}
              />
              <Row gap={10} align={"center"}>
                <ChannelThumbnail
                  title={channelTitle}
                  url={channel.thumbnail}
                  size={30}
                />
                <SubTitle text={channelTitle} />
              </Row>
              <SubTitle text={description} />
            </div>
          </Row>
        </ItemContainer>
      )}
    </>
  );
};

const ItemContainer = styled.div`
  margin: 20px 0;
`;

export default SearchItem;
