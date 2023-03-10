import styled from "styled-components";

import { formattingDate } from "../hooks/formattingDate";

import LikeButton from "./Button/LikeButton";
import Row from "./FlexRow";
import ChannelThumbnail from "./ChannelThumbnail";
import SubTitle from "./SubTitle";
import MoreToggle from "./MoreToggle";

const CommentItem = (comment) => {
  const {
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
          type={"default"}
        />
        <TextContainer>
          <Row align={"center"} justify={"space-between"}>
            <div>
              <Row gap={10}>
                <p>{authorDisplayName}</p>
                <SubTitle text={formattingDate(publishedAt)} />
              </Row>
              <MoreToggle>
                {textOriginal
                  .split("\n")
                  .map((sentence, idx) =>
                    sentence === "" ? (
                      <br key={idx} />
                    ) : (
                      <P key={idx}>{sentence}</P>
                    )
                  )}
              </MoreToggle>
            </div>
            <LikeButton num={likeCount ? likeCount : 0} />
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
const P = styled.p`
  // padding-top: 4px;
  padding-right: 40px;
  color: #555;
  font-size: 0.9em;
`;
export default CommentItem;
