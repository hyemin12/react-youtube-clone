import axios from "axios";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
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
    <Layout>
      <VideoList videos={popular} />
    </Layout>
  );
};

export default Home;
