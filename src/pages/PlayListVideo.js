import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { requestAxios, requestChannel } from "../hooks/requestAxios";

import Row from "../components/FlexRow";
import VideoDetail from "../components/VideoDetail";
import Title from "../components/Title";
import Layout from "../components/structure/Layout";
import Loading from "../components/Loading";
import Thumbnail from "../components/Thumbnail";

import { FaPlay } from "react-icons/fa";

const PlayListVideo = () => {
  const { search } = useLocation();
  // const path = search.split("&");
  const id = search.replace("?", "");
  // const playlistId = path[1].replace("list=", "");
  console.log(id);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [list, setList] = useState();
  const [videoData, setVideoData] = useState();
  const [channelData, setChannelData] = useState();
  const getListItem = async () => {
    try {
      const plRes = await requestAxios.get("playlistItems", {
        params: {
          part: "snippet,contentDetails,status",
          playlistId: id,
          maxResults: 50,
        },
      });
      console.log(plRes.data.items);

      // const channelRes = await requestChannel(
      //   plRes.data.items[0].snippet.channelId
      // );

      setList(plRes.data.items);
      // setChannelData({
      //   subscribe: channelRes.data.items[0].statistics.subscriberCount,
      //   thumbnail: channelRes.data.items[0].snippet.thumbnails.default.url,
      //   customUrl: channelRes.data.items[0].snippet.customUrl,
      // });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getListItem();
  }, []);

  const getVideoData = async () => {
    try {
      const res = await requestAxios.get("videos", {
        params: {
          part: "snippet,statistics",
          id: list[currentIndex - 1].contentDetails.videoId,
        },
      });

      setVideoData(res.data.items[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getVideoData();
  }, [currentIndex]);
  console.log(videoData);

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

              {list.map((item, idx) => {
                const { position, thumbnails, title, channelTitle } =
                  item.snippet;
                return (
                  <Item
                    key={position}
                    className={currentIndex - 1 === idx ? "active" : " "}
                    onClick={() => {
                      setCurrentIndex(idx + 1);
                    }}
                  >
                    <Row gap={10} align={"center"}>
                      {currentIndex - 1 === idx ? (
                        <FaPlay fontSize={10} />
                      ) : (
                        <p>{position + 1}</p>
                      )}
                      <Thumbnail
                        width={"120px"}
                        height={"67px"}
                        url={thumbnails.default.url}
                      />
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
