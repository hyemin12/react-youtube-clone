import { Link } from "react-router-dom";
import styled from "styled-components";
import SubTitle from "./SubTitle";
import Thumbnail from "./Thumbnail";

const VideoList = ({ videos }) => {
  console.log(videos);
  return (
    <ListContainer>
      {videos.map((item) => {
        const { thumbnails, title, channelTitle, publishedAt } = item.snippet;
        return (
          <Link to="" style={{ width: `${thumbnails.medium.width}px` }}>
            <Thumbnail size={thumbnails.medium.url} title={title} />
            <Title>{title}</Title>
            <SubTitle text={channelTitle} color={"#777"} />
            <SubTitle text={publishedAt.slice(0, 10)} color={"#777"} />
          </Link>
        );
      })}
    </ListContainer>
  );
};
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: calc(100vw - 150px);
`;

const Title = styled.h4`
  display: -webkit-box;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
export default VideoList;
