import { useEffect, useState } from "react";
import axios from "axios";

import { converCount } from "../hooks/converCount";
import { useSetChnIdContext } from "../hooks/getChannelIdContext";

import Loading from "../components/Loading";
import ChannelThumbnail from "../components/ChannelThumbnail";
import Title from "../components/Title";
import Layout from "../components/Layout";
import styled from "styled-components";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Channel = () => {
  console.log("채널컴포넌트");

  // 데이터를 가져올 "채널아이디"
  const { settingId } = useSetChnIdContext();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res =
        await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${settingId}&key=${KEY}
    `);
      setData({
        thumbnail: res.data.items[0].snippet.thumbnails,
        title: res.data.items[0].snippet.title,
        customUrl: res.data.items[0].snippet.customUrl,
        subscriberCount: res.data.items[0].statistics.subscriberCount,
        bannerImg:
          res.data.items[0].brandingSettings.image.bannerExternalUrl || null,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <Container>
            {data.bannerImg && <Banner src={data.bannerImg} alt={"banner"} />}
            <Row>
              <ChannelThumbnail
                url={data.thumbnail.default.url}
                size={data.thumbnail.default.width}
                alt={data.title}
                customUrl={data.customUrl}
              />
              <div>
                <Title size={24} text={data.title} cut={false} />

                <P>{data.customUrl}</P>
                <P>구독자 {converCount(data.subscriberCount)}</P>
              </div>
            </Row>
          </Container>
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
  align-items: center;
  gap: 16px;
  padding: 10px 0;
`;
const P = styled.p`
  color: #555;
  font-size: 1em;
`;

export default Channel;
