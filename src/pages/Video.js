import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import {
  requestAxios,
  requestChannel,
  requestPopularVideos,
  requestVideos,
} from "../hooks/requestAxios";
import { recordHistory } from "../hooks/recordHistory";

import Loading from "../components/Loading";
import Layout from "../components/structure/Layout";
import Iframe from "../components/Iframe";
import VideoDetail from "../components/VideoDetail";
import RecommendTabs from "../components/RecommendTabs";

/** 비디오 페이지 */
const Video = () => {
  const { search } = useLocation();
  const id = search.replace("?", "");

  const [loading, setLoading] = useState(true);

  // result : 영상 기본 정보 , statistic : 조회수, 좋아요 수 등
  const [data, setData] = useState({ result: {}, statistic: {} });

  const [channelData, setChannelData] = useState();

  const [recommendList, setRecommendList] = useState([
    { title: "비슷한 영상", list: [] },
    { title: "같은 채널 다른 영상", list: [] },
  ]);

  /** 해당 페이지에서 필요한 데이터 가져오기
   * dataRes: 영상 정보 (제목, 업로드날짜, 설명, 아이디 등)
   * channelRes: 채널 정보 (채널 썸네일, 채널 이름)
   * recommendRes: 채널에서 업로드한 다른 영상 리스트
   */
  const getData = useCallback(async () => {
    try {
      const dataRes = await requestAxios.get("videos", {
        params: {
          part: "snippet,statistics",
          id: id,
        },
      });

      if (dataRes.status === 200) {
        const channelId = dataRes.data.items[0].snippet.channelId;
        const channelRes = await requestChannel(channelId);

        // 같은 채널 영상 목록
        const sameChannel = await requestVideos(channelId, null, 15);

        // 같은 카테고리 영상 목록
        const sameCategory = await requestPopularVideos(
          dataRes.data.items[0].snippet.categoryId,
          15
        );
        setData(dataRes.data.items[0]);
        setChannelData({
          subscribe: channelRes.data.items[0].statistics.subscriberCount,
          thumbnail: channelRes.data.items[0].snippet.thumbnails.default.url,
          customUrl: channelRes.data.items[0].snippet.customUrl,
        });
        setRecommendList([
          { ...recommendList[0], list: sameCategory.data.items },
          { ...recommendList[1], list: sameChannel.data.items },
        ]);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
    recordHistory(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        data && (
          <Layout Layout aside={false}>
            <Container>
              <div>
                <Iframe id={id} width={920} height={517.5} />
                <VideoDetail {...data} {...channelData} />
              </div>

              {/* 추천 동영상 */}
              {recommendList && <RecommendTabs data={recommendList} id={id} />}
            </Container>
          </Layout>
        )
      )}
    </>
  );
};
const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 84px;
`;

export default Video;
