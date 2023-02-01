import { useEffect, useState } from "react";
import styled from "styled-components";

import { requestChannelThumb } from "../hooks/requestAxios";
import useGetStatistics from "../hooks/useGetStatistics";
import { convertCount } from "../hooks/convertCount";

import Loading from "./Loading";
import Row from "./FlexRow";
import ChannelThumbnail from "./ChannelThumbnail";
import SubTitle from "./SubTitle";
import ViewUpload from "./ViewUpload";
import ChannelTitle from "./ChannelTitle";
import VideoThumbnail from "./VideoThumbnail";
import VideoTitle from "./VideoTitle";

// 영상 아이템 - 가로
const VideoItemRow = (data) => {
  const videoId = typeof data.id === "object" ? data.id.videoId : data.id;

  const { channelId } = data.snippet;

  const { viewCount, duration } = useGetStatistics(videoId);

  const [loading, setLoading] = useState(true);

  const [channelData, setChannelData] = useState({
    thumbnail: "",
    customUrl: "",
  });

  // 채널 썸네일 가져오기
  const getData = async () => {
    try {
      const channelRes = await requestChannelThumb(channelId);

      setChannelData({
        thumbnail: channelRes.data.items[0].snippet.thumbnails.medium.url,
        customUrl: channelRes.data.items[0].snippet.customUrl,
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
        <ItemContainer>
          <Row gap={20}>
            <VideoThumbnail
              width={"320px"}
              height={"180px"}
              url={thumbnails.medium.url}
              title={title}
              videoId={videoId}
              duration={duration}
            />

            <div>
              <VideoTitle text={title} videoId={videoId} cut={true} />

              <ViewUpload
                view={convertCount(viewCount)}
                date={publishedAt}
                convert={true}
              />
              <div style={{ padding: "14px 0" }}>
                <Row gap={10} align={"center"}>
                  <ChannelThumbnail
                    title={title}
                    url={channelData.thumbnail}
                    channelId={channelId}
                    customUrl={channelData.customUrl}
                  />
                  <ChannelTitle
                    text={channelTitle}
                    customUrl={channelData.customUrl}
                    channelId={channelId}
                  />
                </Row>
              </div>
              <SubTitle text={description} cut={true} />
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

export default VideoItemRow;
