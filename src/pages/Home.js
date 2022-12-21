import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Aside from "../components/Aside";
import Header from "../components/Header";
import VideoList from "../components/VideoList";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Home = () => {
  const [popular, setPopular] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=kr&maxResults=24&key=${KEY}`
    );
    setPopular(res.data.items);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      <MainContent>
        <Aside />
        <VideoList videos={popular} />
      </MainContent>
    </div>
  );
};
const MainContent = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 10px;
`;
export default Home;
