import Thumbnail from "./Thumbnail";
import SubTitle from "./SubTitle";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Title from "./Title";
const Recommend = ({ item, loading, channelTitle }) => {
  const { title, publishedAt, thumbnails } = item.snippet;

  return (
    <Link to={`../${item.id}`}>
      <Row>
        <Thumbnail
          width={200}
          height={200 * (9 / 16)}
          title={title}
          loading={loading}
          url={thumbnails.medium.url}
        />
        <ContentText>
          <Title size={16} text={title} mode={true} />
          <SubTitle text={channelTitle} />
          <SubTitle text={publishedAt.slice(0, 10)} />
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
