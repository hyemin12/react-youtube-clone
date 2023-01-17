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

  return (
    <Item>
      <Row gap={14}>
        <ChannelThumbnail
          title={authorDisplayName}
          url={authorProfileImageUrl}
          size={36}
        />
        <TextContainer>
          <Row align={"center"} justify={"space-between"}>
            <div>
              <Row gap={10}>
                <p>{authorDisplayName}</p>
                <SubTitle text={calcDate(publishedAt)} />
              </Row>
              <p>{textOriginal}</p>
            </div>
            <LikeButton num={likeCount ? likeCount : 0} bg={"none"} />
          </Row>
        </TextContainer>
      </Row>
    </Item>
  );
};
const Item = styled.div`
  margin: 20px 0;
  line-height: 1.4;
`;

const TextContainer = styled.div`
  flex-grow: 1;
`;
export default CommentItem;
