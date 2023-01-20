import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Row from "../components/FlexRow";
import Iframe from "../components/Iframe";
import Layout from "../components/Layout";
import LinkButton from "../components/LinkButton";
import Loading from "../components/Loading";
import Thumbnail from "../components/Thumbnail";
import { requestAxios } from "../hooks/requestAxios";

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
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <Contanier>
            <div>
              <h4>플레이리스트 화면</h4>
              <iframe
                id="ytplayer"
                type="text/html"
                width={920}
                height={517.5}
                src={`https://www.youtube.com/embed?listType=playlist&list=PLrEETNyrDftPhOWlsXeSkz1CbnWzu63ES&index=2`}
                frameborder="0"
                title={"아아테스트테스트"}
                allowfullscreen
              ></iframe>
            </div>
            <div style={{ width: "360px" }}>
              <h4>플레이 리스트</h4>
              <p>
                {list[0].snippet.channelTitle} - {currentIndex + 1} /
                {list.length}
              </p>

              {list.map((item) => {
                const { position, thumbnails, title, channelTitle } =
                  item.snippet;
                return (
                  <div key={position}>
                    <Row gap={10}>
                      <p>{position + 1}</p>
                      <Thumbnail
                        width={thumbnails.default.url}
                        height={thumbnails.default.url}
                        url={thumbnails.default.url}
                      />
                      <div>
                        <p>{title}</p>
                        <span>{channelTitle}</span>
                      </div>
                    </Row>
                  </div>
                );
              })}
            </div>
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
export default PlayListVideo;
