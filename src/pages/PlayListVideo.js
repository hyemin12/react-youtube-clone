import { useEffect, useState } from "react";
import styled from "styled-components";

import { requestAxios } from "../hooks/requestAxios";

import Row from "../components/FlexRow";
import Iframe from "../components/Iframe";
import Title from "../components/Title";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Thumbnail from "../components/Thumbnail";

import { FaPlay } from "react-icons/fa";

const PlayListVideo = () => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [list, setList] = useState();
  const getListItem = async () => {
    const res = await requestAxios.get("playlistItems", {
      params: {
        part: "snippet,contentDetails,status",
        playlistId: "PLrEETNyrDftPhOWlsXeSkz1CbnWzu63ES",
      },
    });
    setList(res.data.items);
    setLoading(false);
    console.log(res.data.items);
  };
  useEffect(() => {
    getListItem();
  }, []);
  console.log(currentIndex);
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
                src={`https://www.youtube.com/embed?listType=playlist&list=PLrEETNyrDftPhOWlsXeSkz1CbnWzu63ES&index=${currentIndex}`}
                frameborder="0"
                title={"아아테스트테스트"}
                allowfullscreen
              ></iframe>
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
                        <FaPlay fontSize={20} />
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
            <div></div>
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
