import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import VideoList from "../components/VideoList";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Home = () => {
  const [popular, setPopular] = useState([]);
  const [thumbnails, setThumbnails] = useState();

  const getData = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=kr&maxResults=24&key=${KEY}`
    );
    setPopular(res.data.items);

    const res2 = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UC3IZKseVpdzPSBaWxBxundA&key=${KEY}`
    );
    console.log(res2);
    //"UC3IZKseVpdzPSBaWxBxundA"
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      <div>콘텐츠</div>
      <VideoList videos={popular} />
    </div>
  );
};
export default Home;
