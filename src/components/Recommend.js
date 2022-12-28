import { Link } from "react-router-dom";
import styled from "styled-components";

import Thumbnail from "./Thumbnail";
import SubTitle from "./SubTitle";
import Title from "./Title";
import UploadDate from "./UploadDate";

const Recommend = ({ item, channelTitle }) => {
  const { title, publishedAt, thumbnails } = item.snippet;

  return (
    <Link to={`../${item.contentDetails.upload.videoId}`}>
      <Row>
        <Thumbnail
          width={200}
          height={200 * (9 / 16)}
          title={title}
          url={thumbnails.medium.url}
        />
        <ContentText>
          <Title size={16} text={title} mode={true} />
          <SubTitle text={channelTitle} />
          <UploadDate date={publishedAt.slice(0, 19)} />
        </ContentText>
      </Row>
    </Link>
  );
};
const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const ContentText = styled.div`
  width: 180px;
  padding: 4px 0;
`;

export default Recommend;
