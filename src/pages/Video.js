import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ChannelThumbnail from "../components/ChannelThumbnail";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Recommend from "../components/Recommend";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Video = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [channelImg, setChannelImg] = useState();
  const [recommend, setRecommend] = useState();

  const axios = async ({ keyword, option }) => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/${keyword}?${option}&part=snippet&key=${KEY}`
    );
    return res;
  };
  const getData = async () => {
    try {
      const dataRes = axios("videos", `id=${id}`);
      const channelRes = axios(
        "channels",
        `id=${dataRes.data.items[0].snippet.channelId}`
      );
      const recommendRes = axios(
        "activities",
        `channelId=${dataRes.data.items[0].snippet.channelId}`
      );

      setData(dataRes.data.items[0].snippet);
      setChannelImg(channelRes.data.items[0].snippet.thumbnails.default.url);
      setRecommend(recommendRes.data.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      {data && (
        <Content>
          <div>
            <iframe
              id="ytplayer"
              type="text/html"
              width="920"
              height="517.5"
              src={`https://www.youtube.com/embed/${id}`}
              frameborder="0"
              title={id}
              allowfullscreen
            ></iframe>

            <ContentText>
              <VideoTitle>{data.title}</VideoTitle>
              <ChannelRow>
                <ChannelThumbnail
                  size={40}
                  url={channelImg}
                  title={data.channelTitle}
                />
                <ChannelTitle>{data.channelTitle}</ChannelTitle>
              </ChannelRow>
              <Descriptions>
                <p>업로드 날짜: {data.publishedAt.slice(0, 10)}</p>
                {data.description.split("\n").map((sentence) =>
                  sentence === "" ? (
                    <br />
                  ) : (
                    <p
                      style={{
                        color: sentence.includes("#") ? "blue" : "#333",
                      }}
                      key={sentence}
                    >
                      {sentence}
                    </p>
                  )
                )}
              </Descriptions>
            </ContentText>
          </div>
          <RecommendContainer>
            {recommend &&
              recommend.map((item) => (
                <Recommend
                  item={item}
                  loading={loading}
                  channelTitle={data.channelTitle}
                />
              ))}
          </RecommendContainer>
        </Content>
      )}
    </Layout>
  );
};
const Content = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 84px;
`;
const VideoTitle = styled.h3`
  padding: 10px 0;
  margin-bottom: 10px;
`;
const ContentText = styled.div`
  width: 920px;
`;
const ChannelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
`;
const Descriptions = styled.div`
  background-color: #eee;
  border-radius: 10px;
  padding: 16px;
`;
const ChannelTitle = styled.p`
  font-weight: bold;
`;
const RecommendContainer = styled.div``;

export default Video;
