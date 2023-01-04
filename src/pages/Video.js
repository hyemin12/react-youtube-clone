import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { converCount } from "../hooks/converCount";

import ChannelThumbnail from "../components/ChannelThumbnail";
import Layout from "../components/Layout";
import Title from "../components/Title";
import RecommendTabs from "../components/RecommendTabs";
import Loading from "../components/Loading";
import Iframe from "../components/Iframe";
import Button from "../components/Button";
import LikeButton from "../components/LikeButton";
import SubTitle from "../components/SubTitle";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Video = () => {
  const location = useLocation();
  const id = location.search.replace("?", "");

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  const [channel, setChannel] = useState();
  const [recommend, setRecommend] = useState([
    { title: "비슷한 영상", list: [] },
    { title: "같은 채널 다른 영상", list: [] },
  ]);

  const axiosGet = (keyword, option) => {
    const res = axios.get(
      `https://www.googleapis.com/youtube/v3/${keyword}?${option}&part=snippet&key=${KEY}`
    );
    return res;
  };

  const recommendTabs = [
    { title: "같은 채널 다른 영상", recommendData: recommend.channel },
    { title: "비슷한 영상", recommendData: recommend.category },
  ];

  /** 해당 페이지에서 필요한 데이터 가져오기
   * dataRes: 영상 정보 (제목, 업로드날짜, 설명, 아이디 등)
   * channelRes: 채널 정보 (채널 썸네일, 채널 이름)
   * recommendRes: 채널에서 업로드한 다른 영상 리스트
   */ const getData = async () => {
    try {
      const dataRes = await axiosGet("videos", `id=${id}&part=statistics`);
      const channelRes = await axiosGet(
        "channels",
        `id=${dataRes.data.items[0].snippet.channelId}&part=statistics`
      );
      const recommendRes = await axiosGet(
        "activities",
        `channelId=${dataRes.data.items[0].snippet.channelId}&maxResults=10&part=contentDetails`
      );
      const simillarRes = await axiosGet(
        "videos",
        `chart=mostPopular&videoCategoryId=${22}&maxResults=10&regionCode=kr`
      );

      setData({
        result: dataRes.data.items[0].snippet,
        statistic: dataRes.data.items[0].statistics,
      });
      setChannel({
        subscribe: channelRes.data.items[0].statistics.subscriberCount,
        thumbnail: channelRes.data.items[0].snippet.thumbnails.default.url,
      });
      setRecommend([
        { ...recommend[0], list: simillarRes.data.items },
        { ...recommend[1], list: recommendRes.data.items },
      ]);
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
        data && (
          <Layout Layout aside={false}>
            <Content>
              <div>
                <Iframe id={id} width={"920"} height={"517.5"} />

                <TextContainer>
                  <Title size={20} text={data.result.title} mode={false} />
                  <Row>
                    <ChannelRow>
                      <ChannelThumbnail
                        size={40}
                        url={channel.thumbnail}
                        title={data.result.channelTitle}
                      />
                      <div>
                        <p>{data.result.channelTitle}</p>
                        <SubTitle
                          text={`구독자 ${converCount(channel.subscribe)}`}
                        />
                      </div>
                    </ChannelRow>
                    {/* 채널 정보 옆 버튼그룹 */}
                    <div>
                      <LikeButton num={data.statistic.likeCount} />
                      <Button type={"link"} text={"Youtube에서 보기"} id={id} />
                      <Button type={"copy"} text={"공유하기"} id={id} />
                    </div>
                  </Row>
                  {/* 영상 설명 */}
                  <Descriptions>
                    <ChannelRow>
                      <p>
                        조회수:
                        {data.statistic.viewCount.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                      </p>
                      <p>업로드: {data.result.publishedAt.slice(0, 10)} </p>
                    </ChannelRow>

                    {data.result.description
                      .split("\n")
                      .map((sentence, idx) =>
                        sentence === "" ? (
                          <br />
                        ) : (
                          <p key={`${sentence}${idx}`}>{sentence}</p>
                        )
                      )}
                    <br />
                  </Descriptions>
                </TextContainer>
              </div>
              <div>
                {recommend && <RecommendTabs data={recommend} id={id} />}
                {/* {currentTab.recommendData} */}

                {/* {recommend &&
                  recommend.channel
                    .filter((a) => a.contentDetails.upload.videoId !== id)
                    .map((item) => (
                      <Recommend
                        item={item}
                        channelTitle={data.result.channelTitle}
                      />
                    ))}
                {recommend &&
                  recommend.category
                    .filter((a) => a.id !== id)
                    .map((item) => (
                      <Recommend
                        item={item}
                        channelTitle={item.snippet.channelTitle}
                      />
                    ))} */}
              </div>
            </Content>
          </Layout>
        )
      )}
    </>
  );
};
const Content = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 84px;
`;

const TextContainer = styled.div`
  width: 100%;
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
  line-height: 1.4;
  @media screen and (min-width: 1541px) {
    width: 67 vw;
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
const Hashtag = styled(Link)`
  margin-right: 6px;
  color: blue;
`;

export default Video;
