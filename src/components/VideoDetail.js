import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { convertCount } from "../hooks/convertCount";
import { requestAxios } from "../hooks/requestAxios";

import Row from "../components/FlexRow";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import ChannelThumbnail from "../components/ChannelThumbnail";
import Description from "../components/Description";
import CopyButton from "../components/Button/CopyButton";
import LikeButton from "../components/Button/LikeButton";
import LinkButton from "../components/Button/LinkButton";
import CommentItem from "../components/CommentItem";
import { DateTitle } from "../components/ViewUpload";

/** 비디오 콘텐츠
 * 비디오 설명, 채널 정보, 댓글목록 */
const VideoDetail = (data) => {
  // console.log(data);
  const { customUrl, subscribe, thumbnail, id } = data;
  const { title, channelId, channelTitle, publishedAt, description } =
    data.snippet;
  const { viewCount, likeCount } = data.statistics;

  const [commentList, setCommentList] = useState([]);
  const [currentValue, setCurrentValue] = useState("relevance");

  //  댓글 목록 가져오기
  const handleIndex = (e) => {
    setCurrentValue(e.target.value);
    getComment();
  };

  //  댓글 목록 가져오기
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
    <div style={{ width: "100%" }}>
      <Title size={20} text={title} cut={false} />
      <Row gap={10} justify={"space-between"} align={"center"}>
        <LinkButton pathname={"/channel"} query={customUrl} id={channelId}>
          <ChannelContainer>
            <ChannelThumbnail size={40} url={thumbnail} title={channelTitle} />
            <div>
              <p>{channelTitle}</p>

              <SubTitle text={`구독자 ${convertCount(subscribe)}`} />
            </div>
          </ChannelContainer>
        </LinkButton>

        {/* 채널 정보 옆 버튼그룹 */}
        <BtnGroup>
          <LikeButton num={likeCount} />
          <CopyButton text={"공유하기"} id={id} />
        </BtnGroup>
      </Row>

      {/* 영상 설명 */}
      <Descriptions>
        <Row gap={14}>
          <P>조회수 {parseInt(viewCount).toLocaleString()}</P>
          <Date>{publishedAt.slice(0, 10)}</Date>
        </Row>

        <Description des={description} />
      </Descriptions>

      {/* 댓글 탭 */}
      <Row align={"center"} gap={10}>
        <h4 style={{ padding: "20px 0" }}>댓글</h4>
        <select onChange={handleIndex}>
          <option value="relevance">인기댓글순</option>
          <option value="time">최신순</option>
        </select>
      </Row>

      {/* 댓글 작성 */}
      <Row align={"center"} gap={12}>
        <ChannelThumbnail title={"unknown-user"} size={40} />
        <Input placeholder="댓글 추가 기능을 준비중입니다." />
      </Row>

      {/* 댓글 목록 */}
      <CommentContainer>
        {commentList.map((comment) => {
          const commentItem = comment.snippet.topLevelComment.snippet;
          return (
            <CommentItem
              {...commentItem}
              key={`${commentItem.authorDisplayName}-${commentItem.textOriginal}`}
            />
          );
        })}
      </CommentContainer>
    </div>
  );
};

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
export default VideoDetail;
