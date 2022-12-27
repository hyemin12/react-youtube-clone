import { Link } from "react-router-dom";
import styled from "styled-components";

import Thumbnail from "./Thumbnail";
import SubTitle from "./SubTitle";
import Title from "./Title";

const Recommend = ({ item, loading, channelTitle }) => {
  const { title, publishedAt, thumbnails } = item.snippet;

  const updateDate = (uploadDate) => {
    const today = new Date();
    const upload = new Date(uploadDate);

    const year = today.getFullYear() - upload.getFullYear();
    const month = today.getMonth() - upload.getMonth();
    const date = today.getDate() - upload.getDate();
    const hours = today.getHours() - upload.getHours();
    const minutes = today.getMinutes() - upload.getMinutes();
    const sec = today.getSeconds() - upload.getSeconds();
    if (0 < year) return `${month}달전`;
    if (0 < month && month < 12) return `${month}달전`;
    if (8 <= date && date <= 31) return `${Math.floor(date / 7)}주전`;
    if (0 < date && date < 8) return `${date}일전`;
    if (0 < hours) return `${hours}시간전`;
    if (0 < minutes) return `${minutes}분전`;
    if (0 < sec) return `${sec}초전`;
  };

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
          <SubTitle text={updateDate(publishedAt)} />
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
