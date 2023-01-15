import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { convertCount } from "../hooks/convertCount";
import { requestVideos, requestChannel } from "../hooks/requestAxios";

import Loading from "../components/Loading";
import ChannelThumbnail from "../components/ChannelThumbnail";
import Title from "../components/Title";
import Layout from "../components/Layout";

import ChannelHome from "../components/channelTab/ChannelHome";
import ChannelInfo from "../components/channelTab/ChannelInfo";
import ChannelVideos from "../components/channelTab/ChannelVideos";
import Row from "../components/FlexRow";

const Channel = () => {
  console.log("채널컴포넌트");

  // 데이터를 가져올 "채널아이디"
  const id = localStorage.getItem("YT_ID");

  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState();
  const [videoData, setVideoData] = useState();

  const tabs = [
    { tabTitle: "홈", tabContent: <ChannelHome /> },
    {
      tabTitle: "동영상",
      tabContent: <ChannelVideos {...videoData} />,
    },
    { tabTitle: "정보", tabContent: <ChannelInfo {...channelData} /> },
  ];
  const [currentIdx, setCurrentIndex] = useState(0);

  const getData = useCallback(async () => {
    try {
      const resChannel = await requestChannel(id);
      const resVideos = await requestVideos(id);

      setVideoData({
        id: id,
        result: resVideos.data.items,
        nextPage: resVideos.data.nextPageToken,
        totalResults: resVideos.data.pageInfo.totalResults,
      });
      const item = resChannel.data.items[0];
      setChannelData({
        thumbnail: item.snippet.thumbnails,
        title: item.snippet.title,
        customUrl: item.snippet.customUrl,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        country: item.snippet.country,
        subscriberCount: item.statistics.subscriberCount,
        viewCount: item.statistics.viewCount,
        bannerImg: item.brandingSettings.image.bannerExternalUrl || null,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          {channelData && (
            <Container>
              {channelData.bannerImg && (
                <Banner src={channelData.bannerImg} alt={"banner"} />
              )}

              <Row gap={16} align={"center"}>
                <div style={{ padding: "20px 0" }}>
                  <ChannelThumbnail
                    url={channelData.thumbnail.default.url}
                    ize={channelData.thumbnail.default.width}
                    alt={channelData.title}
                    customUrl={channelData.customUrl}
                  />
                  <div>
                    <Title size={24} text={channelData.title} cut={false} />

                    <P>{channelData.customUrl}</P>
                    <P>구독자 {convertCount(channelData.subscriberCount)}</P>
                  </div>
                </div>
              </Row>

              <TabTitleContainer>
                {tabs.map(({ tabTitle }, idx) => (
                  <TabTitle
                    key={tabTitle}
                    className={idx === currentIdx ? "active" : ""}
                    onClick={() => {
                      setCurrentIndex(idx);
                    }}
                  >
                    {tabTitle}
                  </TabTitle>
                ))}
              </TabTitleContainer>

              {tabs[currentIdx].tabContent}
            </Container>
          )}
        </Layout>
      )}
    </>
  );
};

const Container = styled.div`
  width: 85vw;
  min-width: 1270px;
  margin: 0 auto;
`;
const Banner = styled.img`
  width: 100%;
  height: calc((100vw - 240px) / 6.2 - 1px);
  object-fit: cover;
`;

const P = styled.p`
  color: #555;
  font-size: 1em;
`;

const TabTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 30px;
`;
const TabTitle = styled.p`
  padding-bottom: 6px;
  cursor: pointer;
  &.active {
    border-bottom: 2px solid #555;
  }
  &:hover {
    opacity: 0.7;
  }
`;

export default Channel;
