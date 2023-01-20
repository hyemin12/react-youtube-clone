import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { convertCount } from "../hooks/convertCount";
import {
  requestAxios,
  requestChannel,
  requestPopularVideos,
  requestVideos,
} from "../hooks/requestAxios";
import { today } from "../hooks/convertDate";

import Loading from "../components/Loading";
import Layout from "../components/structure/Layout";
import Iframe from "../components/Iframe";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import ChannelThumbnail from "../components/ChannelThumbnail";
import RecommendTabs from "../components/RecommendTabs";
import CopyButton from "../components/Button/CopyButton";
import LikeButton from "../components/Button/LikeButton";
import LinkButton from "../components/Button/LinkButton";
import Description from "../components/Description";
import Row from "../components/FlexRow";
import CommentItem from "../components/CommentItem";
import { DateTitle } from "../components/ViewUpload";
import VideoDetail from "../components/VideoDetail";

const Video = () => {
  console.log("비디오페이지");

  const { search } = useLocation();
  const id = search.replace("?", "");

  const [loading, setLoading] = useState(true);

  // result : 영상 기본 정보 , statistic : 조회수, 좋아요 수 등
  const [data, setData] = useState({ result: {}, statistic: {} });

  const [channelData, setChannelData] = useState();

  const [recommend, setRecommend] = useState([
    { title: "비슷한 영상", list: [] },
    { title: "같은 채널 다른 영상", list: [] },
  ]);
  const [commentList, setCommentList] = useState([]);
  const [currentValue, setCurrentValue] = useState("relevance");

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
        const sameChannel = await requestVideos(channelId);

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
        setRecommend([
          { ...recommend[0], list: sameCategory.data.items },
          { ...recommend[1], list: sameChannel.data.items },
        ]);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 시청 기록 저장
  const recordHistory = useCallback(() => {
    const storageH = localStorage.getItem("YT_History")
      ? JSON.parse(localStorage.getItem("YT_History"))
      : [];
    const now = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;
    const historyArr = [...new Set(storageH.concat({ date: now, id: id }))];

    localStorage.setItem("YT_History", JSON.stringify(historyArr));
  }, [id]);

  useEffect(() => {
    getData();
    recordHistory();
  }, [id]);

  // 댓글 목록 가져오기
  const handleIndex = (e) => {
    setCurrentValue(e.target.value);
    getComment();
  };
  // 댓글 목록 가져오기
  const getComment = useCallback(async () => {
    const commentThr = await requestAxios("commentThreads", {
      params: {
        videoId: id,
        part: "snippet",
        maxResults: 30,
        order: currentValue,
      },
    });
    setCommentList(commentThr.data.items);
  }, [currentValue]);

  useEffect(() => {
    getComment(currentValue);
  }, [currentValue]);

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
              {recommend && <RecommendTabs data={recommend} id={id} />}
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

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  margin-bottom: 10px;
`;
const BtnGroup = styled.div`
  display: flex;
  gap: 10px;
`;
const Descriptions = styled.div`
  background-color: #eee;
  border-radius: 10px;
  padding: 16px;
  color: #333 !important;
  font-size: 1em !important;
  line-height: 1.4;
  @media screen and (min-width: 1541px) {
    width: 67 vw;
  }
`;
const CommentContainer = styled.div`
  flex-shrink: 0;
  width: 920px;
  padding-right: 40px;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  padding: 5px 0;
  border-bottom: 1px solid #555;
  font-size: 1em;
`;
const P = styled.p`
  color: #111;
  font-size: 0.9em;
`;
const Date = styled(DateTitle)`
  padding: 0;
  color: #111;
  font-size: 0.9em;
  &::before {
    background-color: #333;
    top: 8px;
    left: -8px;
  }
`;

export default Video;
