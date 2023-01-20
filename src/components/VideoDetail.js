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

/** 비디오 콘텐츠
 * 비디오 설명, 채널 정보, 댓글목록 */
const VideoDetail = (data) => {
  console.log(data);
  const { title, channelId, channelTitle } = data.snippet;
  return (
    <div style={{ width: "100%" }}>
      <Title size={20} text={data.snippet.title} cut={false} />
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

// <Row gap={10} justify={"space-between"} align={"center"}>
// <LinkButton
//   pathname={"/channel"}
//   query={channel.customUrl}
//   id={data.snippet.channelId}
// >
//   <ChannelContainer>
//     <ChannelThumbnail
//       size={40}
//       url={channel.thumbnail}
//       title={data.snippet.channelTitle}
//     />
//     <div>
//       <p>{data.snippet.channelTitle}</p>

//       <SubTitle text={`구독자 ${convertCount(channel.subscribe)}`} />
//     </div>
//   </ChannelContainer>
// </LinkButton>

// {/* 채널 정보 옆 버튼그룹 */}
// <BtnGroup>
//   <LikeButton num={data.statistics.likeCount} />
//   <CopyButton text={"공유하기"} id={id} />
// </BtnGroup>
// </Row>

// {/* 영상 설명 */}
// <Descriptions>
// <Row gap={14}>
//   <P>조회수 {parseInt(data.statistics.viewCount).toLocaleString()}</P>
//   <Date>{data.snippet.publishedAt.slice(0, 10)}</Date>
// </Row>

// <Description des={data.snippet.description} />
// </Descriptions>
// {/* 댓글 목록 */}

// <Row align={"center"} gap={10}>
// <h4 style={{ padding: "20px 0" }}>댓글</h4>
// <select onChange={handleIndex}>
//   <option value="relevance">인기댓글순</option>
//   <option value="time">최신순</option>
// </select>
// </Row>
// <Row align={"center"} gap={12}>
// <ChannelThumbnail title={"unknown-user"} size={40} />
// <Input placeholder="댓글 추가 기능을 준비중입니다." />
// </Row>

// <CommentContainer>
// {commentList.map((comment) => {
//   const commentItem = comment.snippet.topLevelComment.snippet;
//   return (
//     <CommentItem
//       {...commentItem}
//       key={`${commentItem.authorDisplayName}-${commentItem.textOriginal}`}
//     />
//   );
// })}
// </CommentContainer>
