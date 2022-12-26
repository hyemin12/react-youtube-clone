import Thumbnail from "./Thumbnail";
import SubTitle from "./SubTitle";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Recommend = ({ item, loading, channelTitle }) => {
  const { title, publishedAt, thumbnails } = item.snippet;
  return (
    <Link to={`../${item.id}`}>
      <Row>
        <Thumbnail size={thumbnails.medium} title={title} loading={loading} />
        <ContentText>
          <p>{title}</p>
          <SubTitle text={channelTitle} />
          <SubTitle text={publishedAt.slice(0, 10)} />
        </ContentText>
      </Row>
    </Link>
  );
};
const Row = styled.div`
  display: flex;
`;
const ContentText = styled.div`
  width: 180px;
`;
export default Recommend;
