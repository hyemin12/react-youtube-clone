import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ChannelThumbnail from "../components/ChannelThumbnail";

import Layout from "../components/Layout";
import styled from "styled-components";
import Header from "../components/Header";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Video = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [channelImg, setChannelImg] = useState();

  const getData = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${KEY}`
    );
    const channelRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${res.data.items[0].snippet.channelId}&key=${KEY}`
    );

    setData(res.data.items[0].snippet);
    console.log(res.data.items[0].snippet);
    setChannelImg(channelRes.data.items[0].snippet.thumbnails.default.url);
  };

  useEffect(() => {
    getData();
  }, []);
  // console.log(data);
  // const { title, publishedAt, channelTitle, description } = data;

  return (
    <Layout>
      {data && (
        <Content>
          <iframe
            id="ytplayer"
            type="text/html"
            width="920"
            height="517.5"
            src={`https://www.youtube.com/embed/${id}`}
            frameborder="0"
            title={id}
            allowfullscreen
          ></iframe>

          <ContentText>
            <h3>{data.title}</h3>
            <Row>
              <ChannelThumbnail
                size={50}
                url={channelImg}
                title={data.channelTitle}
              />
              <ChannelTitle>{data.channelTitle}</ChannelTitle>
            </Row>

            <p>{data.description}</p>
          </ContentText>
        </Content>
      )}
    </Layout>
  );
};
const Content = styled.div`
  padding: 0 84px;
`;
const Row = styled.div`
  display: flex;
  gap: 20px;
`;
const ContentText = styled.div`
  width: 920px;
`;

const ChannelTitle = styled.p`
  font-weight: bold;
`;

export default Video;
