import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { convertCount } from "../hooks/convertCount";
import {
  requestVideos,
  requestChannel,
  requestAxios,
} from "../hooks/requestAxios";

import Loading from "../components/Loading";
import Layout from "../components/structure/Layout";
import Row from "../components/FlexRow";
import ChannelThumbnail from "../components/ChannelThumbnail";
import Title from "../components/Title";

import ChannelHome from "../components/channelTab/ChannelHome";
import ChannelInfo from "../components/channelTab/ChannelInfo";
import ChannelVideos from "../components/channelTab/ChannelVideos";
import ChannelPlaylist from "../components/channelTab/ChannelPlaylist";

const Channel = () => {
  // 데이터를 가져올 "채널아이디"
  const channelId = localStorage.getItem("YT_ID");
  const bannerRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState();
  const [videoData, setVideoData] = useState();
  const [playlists, setPlaylists] = useState();

  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    {
      tabTitle: "홈",
      tabContent: <ChannelHome videos={videoData} playlist={playlists} />,
    },
    {
      tabTitle: "동영상",
      tabContent: <ChannelVideos {...videoData} />,
    },
    { tabTitle: "재생목록", tabContent: <ChannelPlaylist lists={playlists} /> },

    { tabTitle: "정보", tabContent: <ChannelInfo {...channelData} /> },
  ];

  /** 비디오 목록 가져오기 */
  const getVideosData = async (id) => {
    const resVideos = await requestVideos(channelId);

    setVideoData({
      id: id,
      result: resVideos.data.items.filter(
        (element, idx) =>
          resVideos.data.items.findIndex(
            (element2) => element.snippet.title === element2.snippet.title
          ) === idx
      ),
      nextPage: resVideos.data.nextPageToken,
    });
  };

  /** 재생목록 리스트 가져오기 */
  const getPlaylistData = async (id) => {
    const resPlaylists = await requestAxios("playlists", {
      params: { part: "snippet,contentDetails", channelId: id, maxResults: 50 },
    });

    setPlaylists(resPlaylists.data.items);
  };

  /** 현재 채널 정보 가져오기 */
  const getChannelData = async (id) => {
    const resChannel = await requestChannel(id);

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
      bannerImg: item.brandingSettings.image
        ? item.brandingSettings.image.bannerExternalUrl
        : null,
    });
  };

  const getData = useCallback(async () => {
    try {
      await getVideosData(channelId);
      await getPlaylistData(channelId);
      await getChannelData(channelId);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [channelId]);

  useEffect(() => {
    getData();
  }, [channelId]);

  const handleImgError = () => {
    if (bannerRef.current) {
      bannerRef.current.style = "display:none";
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout aside={true}>
          {channelData && (
            <Container>
              {channelData.bannerImg && (
                <Banner
                  src={channelData.bannerImg}
                  alt={"banner"}
                  onError={handleImgError}
                  ref={bannerRef}
                />
              )}

              <Row gap={16} align={"center"}>
                <ChannelThumbnail
                  url={channelData.thumbnail.default.url}
                  size={channelData.thumbnail.default.width}
                  alt={channelData.title}
                  customUrl={channelData.customUrl}
                />
                <div>
                  <Title size={24} text={channelData.title} cut={false} />

                  <P>{channelData.customUrl}</P>
                  <P>구독자 {convertCount(channelData.subscriberCount)}</P>
                </div>
              </Row>

              <TabTitleContainer>
                {tabs.map(({ tabTitle }, idx) => (
                  <TabTitle
                    key={tabTitle}
                    className={idx === currentTab ? "active" : ""}
                    onClick={() => {
                      setCurrentTab(idx);
                    }}
                  >
                    {tabTitle}
                  </TabTitle>
                ))}
              </TabTitleContainer>

              {tabs[currentTab].tabContent}
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
  margin-bottom: 40px;
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
  margin: 30px 0;
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
