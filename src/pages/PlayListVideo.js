import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import {
  requestAxios,
  requestChannel,
  requestPlaylistItem,
} from "../hooks/requestAxios";

import Row from "../components/FlexRow";
import VideoDetail from "../components/VideoDetail";
import Title from "../components/Title";
import Layout from "../components/structure/Layout";
import Loading from "../components/Loading";

import { FaPlay } from "react-icons/fa";
import VideoThumbnail from "../components/VideoThumbnail";

const PlayListVideo = () => {
  const { search } = useLocation();
  const id = search.replace("?", "");

  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);

  const [list, setList] = useState();
  const [videoData, setVideoData] = useState();
  const [channelData, setChannelData] = useState();

  const getListItem = async () => {
    try {
      const plRes = await requestPlaylistItem(id);
      setList(plRes.data.items);

      if (plRes.status === 200) {
        const currentVideo = plRes.data.items[0];

        const channelRes = await requestChannel(currentVideo.snippet.channelId);

        const videoRes = await requestAxios.get("videos", {
          params: {
            part: "snippet,statistics",
            id: currentVideo.contentDetails.videoId,
          },
        });

        setVideoData(videoRes.data.items[0]);

        setChannelData({
          subscribe: channelRes.data.items[0].statistics.subscriberCount,
          thumbnail: channelRes.data.items[0].snippet.thumbnails.default.url,
          customUrl: channelRes.data.items[0].snippet.customUrl,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getListItem();
  }, []);

  /** 재생 목록에 있는 영상 클릭하면 active 영상 변경하는 함수 */
  const changeActiveVideo = useCallback(
    async (idx) => {
      setCurrentIndex(idx);
      setLoading(true);
      try {
        const res = await requestAxios.get("videos", {
          params: {
            part: "snippet,statistics",
            id: list[idx - 1].contentDetails.videoId,
          },
        });
        setVideoData(res.data.items[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
    [currentIndex]
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <Contanier>
            <div>
              <iframe
                id="ytplayer"
                type="text/html"
                width={920}
                height={517.5}
                src={`https://www.youtube.com/embed?listType=playlist&list=${id}&index=${currentIndex}`}
                frameborder="0"
                title={id}
                allowfullscreen
              ></iframe>
              <VideoDetail {...videoData} {...channelData} />
            </div>
            <ListContainer style={{ width: "360px" }}>
              <ListTitle>
                <Title text={"플레이리스트"} size={20} />
                <p>
                  {list[0].snippet.channelTitle} - {currentIndex + 1} /
                  {list.length}
                </p>
              </ListTitle>
              <ItemsContainer>
                {list.map((item, idx) => {
                  const { position, thumbnails, title, channelTitle } =
                    item.snippet;
                  return (
                    <Item
                      key={position}
                      className={currentIndex - 1 === idx ? "active" : " "}
                      onClick={() => {
                        changeActiveVideo(idx + 1);
                      }}
                    >
                      <Row gap={10} align={"center"}>
                        {currentIndex - 1 === idx ? (
                          <FaPlay fontSize={10} />
                        ) : (
                          <p>{position + 1}</p>
                        )}
                        <VideoThumbnail
                          width={"120px"}
                          height={"67px"}
                          url={thumbnails.default.url}
                          title={title}
                        />
                        {/* <Thumbnail
                         
                        /> */}
                        <div>
                          <Title
                            text={title}
                            size={14}
                            cut={true}
                            margin={"0 0 2px 0"}
                          />
                          <ChannelT>{channelTitle}</ChannelT>
                        </div>
                      </Row>
                    </Item>
                  );
                })}
              </ItemsContainer>
            </ListContainer>
          </Contanier>
        </Layout>
      )}
    </>
  );
};
const Contanier = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 84px;
`;
const ListContainer = styled.div`
  height: 100%;

  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
`;
const ListTitle = styled.div`
  padding: 14px;
  border-bottom: 1px solid #ccc;
`;
const ItemsContainer = styled.div`
  max-height: 870px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 40%;
    background-color: #bbb;
  }
`;
const Item = styled.div`
  padding: 8px 14px;
  cursor: pointer;
  &.active {
    background-color: #eee;
  }
  &:hover {
    box-shadow: 0 -4px 4px -4px #ccc, 0 4px 4px -4px #ccc;
  }
`;
const ChannelT = styled.span`
  font-size: 0.8em;
  color: #555;
`;
export default PlayListVideo;
