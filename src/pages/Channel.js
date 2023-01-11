import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FaChartLine, FaInfoCircle, FaMapMarker } from "react-icons/fa";

import { converCount } from "../hooks/converCount";
import { useSetChnIdContext } from "../hooks/getChannelIdContext";
import { converContry } from "../hooks/converContry";

import Loading from "../components/Loading";
import ChannelThumbnail from "../components/ChannelThumbnail";
import Title from "../components/Title";
import Layout from "../components/Layout";
import styled from "styled-components";
import Description from "../components/Description";
import ChannelVideoItem from "../components/ChannelVideoItem";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Channel = () => {
  console.log("채널컴포넌트");

  // 데이터를 가져올 "채널아이디"
  const { settingId } = useSetChnIdContext();

  const [channelData, setChannelData] = useState();
  const [videoData, setVideoData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      const res =
        await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${settingId}&key=${KEY}
    `);

      const res3 =
        await axios.get(`https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${settingId}&maxResults=15&key=${KEY}
    `);
      const res4 =
        await axios.get(`https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${settingId}&maxResults=15&pageToken=${res3.data.nextPageToken}&key=${KEY}
    `);
      console.log(res3.data.items, res3.data, res4.data);
      setVideoData({
        result: res3.data.items,
        nextPage: res3.data.nextPageToken,
        totalResults: res3.data.pageInfo.totalResults,
      });
      const item = res.data.items[0];
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
  }, [settingId]);

  useEffect(() => {
    getData();
  }, [settingId]);
  console.log();
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
              <Row align={"center"}>
                <ChannelThumbnail
                  url={channelData.thumbnail.default.url}
                  ize={channelData.thumbnail.default.width}
                  alt={channelData.title}
                  customUrl={channelData.customUrl}
                />
                <div>
                  <Title size={24} text={channelData.title} cut={false} />

                  <P>{channelData.customUrl}</P>
                  <P>구독자 {converCount(channelData.subscriberCount)}</P>
                </div>
              </Row>
              <div>
                <span>홈</span>
                <span>정보</span>
              </div>
              <div>
                <h4>동영상 · 전체 {videoData.totalResults}개</h4>
                <VideoRow>
                  {videoData.result.map((item) => (
                    <ChannelVideoItem {...item} />
                  ))}
                </VideoRow>
              </div>
              <div>
                <Row align={"start"}>
                  <div style={{ width: "69vw" }}>
                    <H4>설명</H4>
                    <Description des={channelData.description} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <H4>추가정보</H4>
                    <Row align={"center"}>
                      <FaInfoCircle />
                      <p>가입일: {channelData.publishedAt.slice(0, 10)}</p>
                    </Row>

                    <Row align={"center"}>
                      <FaChartLine />
                      <p>
                        조회수: {Number(channelData.viewCount).toLocaleString()}
                        회
                      </p>
                    </Row>

                    <Row align={"center"}>
                      <FaMapMarker />
                      <p>위치: {converContry(channelData.country)}</p>
                    </Row>
                  </div>
                </Row>
              </div>
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
const Row = styled.div`
  display: flex;
  align-items: ${(props) => props.align};
  gap: 16px;
  padding: 10px 0;
`;
const P = styled.p`
  color: #555;
  font-size: 1em;
`;
const H4 = styled.h4`
  margin-bottom: 1em;
`;
const VideoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default Channel;
