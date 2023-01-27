import styled from "styled-components";

import Thumbnail from "../Thumbnail";
import Title from "../Title";
import LinkButton from "../Button/LinkButton";

import { FaList } from "react-icons/fa";

// 채널 재생목록 탭
const ChannelPlaylist = ({ lists }) => {
  // console.log(lists);
  if (!lists) {
    return <p>재생목록이 없습니다.</p>;
  }
  return (
    <VideoRow>
      {lists.map((item) => {
        const { title, thumbnails } = item.snippet;
        return (
          <LinkButton pathname={"/watchPL"} query={item.id} key={item.id}>
            <ItemContainer>
              <ThumbnailContainer>
                <Thumbnail
                  width="240px"
                  height="135px"
                  url={thumbnails.medium.url}
                />
                <Icon>
                  <FaList />
                </Icon>
              </ThumbnailContainer>
              <Title text={title} cut={true} />
            </ItemContainer>
          </LinkButton>
        );
      })}
    </VideoRow>
  );
};
const VideoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 0;
`;
const ItemContainer = styled.div`
  width: 240px;
`;
const ThumbnailContainer = styled.div`
  flex-grow: 0;
  width: 240px;
  height: 135px;
  border-radius: 10px;
  margin-bottom: 4px;
  position: relative;
  overflow: hidden;

  &:hover::before {
    content: "▶ 모두 재생";
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 135px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;
const Icon = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 135px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
`;
export default ChannelPlaylist;
