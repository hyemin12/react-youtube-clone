import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { converCount } from "../hooks/converCount";
import { useSetChnIdContext } from "../hooks/getChannelIdContext";
import { converContry } from "../hooks/converContry";

import Loading from "../components/Loading";
import ChannelThumbnail from "../components/ChannelThumbnail";
import Title from "../components/Title";
import Layout from "../components/Layout";
import styled from "styled-components";
import Description from "../components/Description";
import { FaChartLine, FaInfoCircle, FaMapMarker } from "react-icons/fa";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Channel = () => {
  console.log("채널컴포넌트");
  console.log();
  // 데이터를 가져올 "채널아이디"
  const { settingId } = useSetChnIdContext();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      const res =
        await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${settingId}&key=${KEY}
    `);
      console.log(res.data.items[0]);

      setData({
        thumbnail: res.data.items[0].snippet.thumbnails,
        title: res.data.items[0].snippet.title,
        customUrl: res.data.items[0].snippet.customUrl,
        description: res.data.items[0].snippet.description,
        publishedAt: res.data.items[0].snippet.publishedAt,
        country: res.data.items[0].snippet.country,
        subscriberCount: res.data.items[0].statistics.subscriberCount,
        viewCount: res.data.items[0].statistics.viewCount,
        bannerImg:
          res.data.items[0].brandingSettings.image.bannerExternalUrl || null,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [settingId]);
  console.log(data);
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
          {data && (
            <Container>
              {data.bannerImg && <Banner src={data.bannerImg} alt={"banner"} />}
              <Row align={"center"}>
                <ChannelThumbnail
                  url={data.thumbnail.default.url}
                  ize={data.thumbnail.default.width}
                  alt={data.title}
                  customUrl={data.customUrl}
                />
                <div>
                  <Title size={24} text={data.title} cut={false} />

                  <P>{data.customUrl}</P>
                  <P>구독자 {converCount(data.subscriberCount)}</P>
                </div>
              </Row>
              <div>
                <span>홈</span>
                <span>정보</span>
              </div>
              <div>
                <Row align={"start"}>
                  <div style={{ width: "vw" }}>
                    <H4>설명</H4>
                    <Description des={data.description} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <H4>추가정보</H4>
                    <Row align={"center"}>
                      <FaInfoCircle />
                      <p>가입일: {data.publishedAt.slice(0, 10)}</p>
                    </Row>

                    <Row align={"center"}>
                      <FaChartLine />
                      <p>조회수: {Number(data.viewCount).toLocaleString()}회</p>
                    </Row>

                    <Row align={"center"}>
                      <FaMapMarker />
                      <p>위치: {converContry(data.country)}</p>
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

export default Channel;
