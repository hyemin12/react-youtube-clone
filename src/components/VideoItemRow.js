import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  requestChannelThumb,
  requestContentDetails,
} from "../hooks/requestAxios";
import { convertCount } from "../hooks/convertCount";

import Loading from "./Loading";
import Row from "./FlexRow";
import LinkButton from "./Button/LinkButton";
import ChannelThumbnail from "./ChannelThumbnail";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import SubTitle from "./SubTitle";
import ViewUpload from "./ViewUpload";

// 영상 아이템 - 가로
const VideoItemRow = (data) => {
  const videoId = typeof data.id === "object" ? data.id.videoId : data.id;

  const { channelId } = data.snippet;

  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState({
    thumbnail: "",
    customUrl: "",
  });

  const [ectData, setEctData] = useState();

  // 채널 썸네일 가져오기
  const getData = async () => {
    try {
      const channelRes = await requestChannelThumb(channelId);

      setChannelData({
        thumbnail: channelRes.data.items[0].snippet.thumbnails.medium.url,
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

  const { thumbnails, title, channelTitle, publishedAt, description } =
    data.snippet;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LinkButton pathname={"/watch"} query={videoId}>
          <ItemContainer>
            <Row gap={20}>
              <Thumbnail
                width={"320px"}
                height={"180px"}
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
                <div style={{ padding: "14px 0" }}>
                  <Row gap={10} align={"center"}>
                    <ChannelThumbnail
                      title={channelTitle}
                      url={channelData.thumbnail}
                      size={30}
                    />
                    <SubTitle text={channelTitle} />
                  </Row>
                </div>
                <SubTitle text={description} cut={true} />
              </div>
            </Row>
          </ItemContainer>
        </LinkButton>
      )}
    </>
  );
};

const ItemContainer = styled.div`
  margin: 20px 0;
`;

export default VideoItemRow;
