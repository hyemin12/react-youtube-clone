import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import VideoList from "../components/VideoList";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState([]);

  const getData = useCallback(async () => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=kr&maxResults=32&key=${KEY}`
    );
    setPopular(res.data.items);
    setLoading(false);
  }, [popular]);
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout aside={true}>
      {loading ? <Loading /> : <VideoList videos={popular} />}
    </Layout>
  );
};

export default Home;
