import styled from "styled-components";

import { calcDate } from "../hooks/convertDate";

import ChannelThumbnail from "./ChannelThumbnail";
import Row from "./FlexRow";
import LikeButton from "./LikeButton";
import SubTitle from "./SubTitle";

const CommentItem = (comment) => {
  // console.log(comment);
  const {
    authorChannelUrl,
    authorDisplayName,
    authorProfileImageUrl,
    publishedAt,
    textOriginal,
    likeCount,
  } = comment;
  console.log(comment);
  return (
    <Item>
      <Row gap={14}>
        <ChannelThumbnail
          title={authorDisplayName}
          url={authorProfileImageUrl}
          size={36}
        />
        <div>
          <Row gap={10}>
            <p>{authorDisplayName}</p>
            <SubTitle text={calcDate(publishedAt)} />
          </Row>
          <p>{textOriginal}</p>
          <BtnGroup>
            <LikeButton num={likeCount ? likeCount : 0} bg={"none"} />
            <LikeButton bg={"none"} mode={"dislike"} />
          </BtnGroup>
        </div>
      </Row>
    </Item>
  );
};
const Item = styled.div`
  margin: 20px 0;
  line-height: 1.4;
`;
const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 5px 0;
`;
export default CommentItem;
