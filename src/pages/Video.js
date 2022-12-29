import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ChannelThumbnail from "../components/ChannelThumbnail";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Recommend from "../components/Recommend";
import Loading from "../components/Loading";
import Iframe from "../components/Iframe";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Video = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  const [channelImg, setChannelImg] = useState();
  const [recommend, setRecommend] = useState();

  const axiosGet = (keyword, option) => {
    const res = axios.get(
      `https://www.googleapis.com/youtube/v3/${keyword}?${option}&part=snippet&key=${KEY}`
    );
    return res;
  };
  /** 해당 페이지에서 필요한 데이터 가져오기
   * dataRes: 영상 정보 (제목, 업로드날짜, 설명, 아이디 등)
   * channelRes: 채널 정보 (채널 썸네일, 채널 이름)
   * recommendRes: 채널에서 업로드한 다른 영상 리스트
   */
  const getData = async () => {
    try {
      const dataRes = await axiosGet("videos", `id=${id}`);
      const channelRes = await axiosGet(
        "channels",
        `id=${dataRes.data.items[0].snippet.channelId}`
      );
      const recommendRes = await axiosGet(
        "activities",
        `channelId=${dataRes.data.items[0].snippet.channelId}&maxResults=10&part=contentDetails`
      );
      setData(dataRes.data.items[0].snippet);
      setChannelImg(channelRes.data.items[0].snippet.thumbnails.default.url);
      setRecommend(recommendRes.data.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(recommend);
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        data && (
          <Content>
            <div>
              <Iframe id={id} width={"920"} height={"517.5"} />

              <ContentText>
                <Title size={20} text={data.title} mode={false} />

                <ChannelRow>
                  <ChannelThumbnail
                    size={40}
                    url={channelImg}
                    title={data.channelTitle}
                  />
                  <p>{data.channelTitle}</p>
                </ChannelRow>
                <Descriptions>
                  <p>업로드: {data.publishedAt.slice(0, 10)}</p>
                  {data.description
                    .split("\n")
                    .map((sentence) =>
                      sentence === "" ? (
                        <br />
                      ) : (
                        <p key={sentence}>{sentence}</p>
                      )
                    )}
                  <br />
                  {/* {data.tags.map((tag) => (
                    <Hashtag key={tag}>#{tag}</Hashtag>
                  ))} */}
                </Descriptions>
              </ContentText>
            </div>
            <div>
              <RecomTitle>같은 채널 다른 영상</RecomTitle>
              {recommend &&
                recommend
                  .filter((a) => a.contentDetails.upload.videoId !== id)
                  .map((item) => (
                    <Recommend item={item} channelTitle={data.channelTitle} />
                  ))}
            </div>
          </Content>
        )
      )}
    </Layout>
  );
};
const Content = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 84px;
`;
const RecomTitle = styled.p`
  display: inline-block;
  background-color: #ddd;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const ContentText = styled.div`
  width: 920px;
`;
const ChannelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  margin-bottom: 10px;
`;
const Descriptions = styled.div`
  background-color: #eee;
  border-radius: 10px;
  padding: 16px;
`;
const Hashtag = styled(Link)`
  margin-right: 6px;
  color: blue;
`;

export default Video;
