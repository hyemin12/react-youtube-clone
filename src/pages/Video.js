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
import SkeletonUi from "../components/skeletonUI/SkeletonUi";
import Row from "../components/FlexRow";

/** 비디오 페이지 */
const Video = () => {
  const { search } = useLocation();
  const videoId = search.replace("?", "");

  const [loading, setLoading] = useState(true);

  // result : 영상 기본 정보 , statistic : 조회수, 좋아요 수 등
  const [videoData, setVideoData] = useState({ result: {}, statistic: {} });

  const [channelData, setChannelData] = useState();

  const [recommendList, setRecommendList] = useState([
    { title: "비슷한 영상", list: [] },
    { title: "같은 채널 다른 영상", list: [] },
  ]);

  /** 해당 페이지에서 필요한 데이터 가져오기
   */
  const getData = useCallback(async () => {
    try {
      const videoRes = await requestAxios.get("videos", {
        params: {
          part: "snippet,statistics",
          id: videoId,
        },
      });
      if (videoRes.status === 200) {
        const channelId = videoRes.data.items[0].snippet.channelId;
        const channelRes = await requestChannel(channelId);

        // 같은 채널 영상 목록
        const sameChannel = await requestVideos(channelId, null, 15);

        // 같은 카테고리 영상 목록
        const sameCategory = await requestPopularVideos(
          videoRes.data.items[0].snippet.categoryId,
          15
        );
        setVideoData(videoRes.data.items[0]);
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
    recordHistory(videoId);
  }, [videoId]);

  return (
    <>
      <Layout Layout aside={false}>
        <Container>
          <div>
            {loading ? (
              <SkeletonUi width={920} height={517.5} marginBottom={8} />
            ) : (
              <Iframe id={videoId} width={920} height={517.5} />
            )}

            {loading ? (
              <>
                <SkeletonUi width={920} height={38} marginBottom={8} />
                <Row gap={16}>
                  <SkeletonUi width={38} height={38} borderRadius={"50%"} />
                  <div>
                    <SkeletonUi width={50} height={18} />
                    <SkeletonUi width={80} height={18} marginBottom={20} />
                  </div>
                </Row>
                <SkeletonUi width={920} height={160} />
              </>
            ) : (
              <>
                {videoData && <VideoDetail {...videoData} {...channelData} />}
              </>
            )}
          </div>

          {/* 추천 동영상 */}
          <RecommendTabs
            recommendList={recommendList}
            id={videoId}
            loading={loading}
          />
        </Container>
      </Layout>
    </>
  );
};
const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 84px;
`;

export default Video;
