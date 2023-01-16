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

import Loading from "../components/Loading";
import Layout from "../components/Layout";
import Iframe from "../components/Iframe";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import ChannelThumbnail from "../components/ChannelThumbnail";
import RecommendTabs from "../components/RecommendTabs";
import Button from "../components/Button";
import LikeButton from "../components/LikeButton";
import LinkButton from "../components/LinkButton";
import Description from "../components/Description";
import Row from "../components/FlexRow";
import CommentItem from "../components/CommentItem";

const Video = () => {
  console.log("비디오페이지");
  const { search } = useLocation();
  const id = search.replace("?", "");

  const [loading, setLoading] = useState(true);

  // result : 영상 기본 정보 , statistic : 조회수, 좋아요 수 등
  const [data, setData] = useState({ result: {}, statistic: {} });

  const [channel, setChannel] = useState();

  const [recommend, setRecommend] = useState([
    { title: "비슷한 영상", list: [] },
    { title: "같은 채널 다른 영상", list: [] },
  ]);
  const [commentList, setCommentList] = useState([]);

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
        //videoCategoryId
        const sameCategory = await requestPopularVideos(
          dataRes.data.items[0].snippet.categoryId,
          15
        );
        const commentThr = await requestAxios("commentThreads", {
          params: {
            videoId: id,
            part: "snippet",
            maxResults: 50,
          },
        });
        setCommentList(commentThr.data.items);
        // console.log();

        setData(dataRes.data.items[0]);
        setChannel({
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
  }, [id]);

  useEffect(() => {
    getData();
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
                <Iframe id={id} width={"920"} height={"517.5"} />

                <div style={{ width: "100%" }}>
                  <Title size={20} text={data.snippet.title} cut={false} />
                  <Row gap={10} justify={"space-between"} align={"center"}>
                    <LinkButton
                      pathname={"/channel"}
                      query={channel.customUrl}
                      id={data.snippet.channelId}
                    >
                      <ChannelContainer>
                        <ChannelThumbnail
                          size={40}
                          url={channel.thumbnail}
                          title={data.snippet.channelTitle}
                        />
                        <div>
                          <p>{data.snippet.channelTitle}</p>

                          <SubTitle
                            text={`구독자 ${convertCount(channel.subscribe)}`}
                          />
                        </div>
                      </ChannelContainer>
                    </LinkButton>

                    {/* 채널 정보 옆 버튼그룹 */}
                    <BtnGroup>
                      <LikeButton num={data.statistics.likeCount} />
                      <Button type={"link"} text={"Youtube에서 보기"} id={id} />
                      <Button type={"copy"} text={"공유하기"} id={id} />
                    </BtnGroup>
                  </Row>
                  {/* 영상 설명 */}
                  <Descriptions>
                    <ChannelContainer>
                      <p>
                        조회수:
                        {data.statistics.viewCount.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                      </p>
                      <p>업로드: {data.snippet.publishedAt.slice(0, 10)} </p>
                    </ChannelContainer>

                    <Description des={data.snippet.description} />

                    <br />
                  </Descriptions>
                  {/* 댓글 목록 */}

                  <h4 style={{ padding: "20px 0" }}>댓글</h4>
                  <Row align={"center"} gap={12}>
                    <ChannelThumbnail title={"unknown-user"} size={40} />
                    <Input placeholder="댓글 추가 기능을 준비중입니다." />
                  </Row>

                  <CommentContainer>
                    {commentList.map((comment) => {
                      const commentItem =
                        comment.snippet.topLevelComment.snippet;
                      return (
                        <CommentItem
                          {...commentItem}
                          key={`${commentItem.authorDisplayName}-${commentItem.textOriginal}`}
                        />
                      );
                    })}
                  </CommentContainer>
                </div>
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

export default Video;
