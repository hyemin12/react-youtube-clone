import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import VideoList from "../components/VideoList";
import Nav from "../components/Nav";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const keywords = [
    { keyword: "인기", category: 0 },
    { keyword: "kpop", category: 10 },
    { keyword: "Playlist", category: "" },
    { keyword: "실시간", category: "" },
    { keyword: "게임", category: 20 },
    { keyword: "뉴스", category: 25 },
    { keyword: "여행", category: 19 },
    { keyword: "동물", category: 15 },
    { keyword: "배구", category: "" },
    { keyword: "축구", category: "" },
    { keyword: "런닝맨", category: "" },
    { keyword: "그것이알고싶다", category: "" },
  ];

  const getData = async () => {
    const current = keywords[currentIndex];
    console.log(current, currentIndex);
    try {
      if (currentIndex === 0) {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&regionCode=kr&maxResults=32&key=${KEY}`
        );
        setResult(res.data.items);
      } else if (typeof current.category === "number") {
        const res =
          await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&videoCategoryId=${current.category}&type=video&maxResults=32&regionCode=kr&key=${KEY}
        `);
        setResult(res.data.items);
      } else {
        const res =
          await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${current.keyword}&type=video&maxResults=32&regionCode=kr&key=${KEY}
    `);
        setResult(res.data.items);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(result);

  useEffect(() => {
    getData();
  }, [currentIndex]);

  /** 카테고리 아이디 정보
   * sport 17
   * music 10
   * travel 19
   *  */

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout aside={true}>
          <aside>
            <Nav />
          </aside>
          <div>
            <Row>
              {keywords.map(({ keyword }, idx) => (
                <Keyword
                  key={keyword}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setLoading(true);
                  }}
                  className={idx === currentIndex ? "isActive" : ""}
                >
                  <p># {keyword}</p>
                </Keyword>
              ))}
            </Row>
            <VideoList videos={result} />
          </div>
        </Layout>
      )}
    </>
  );
};
const Row = styled.div`
  display: flex;
  gap: 12px;
`;
const Keyword = styled(Link)`
  display: block;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 30px;
  &:hover {
    background-color: #eee;
  }
  &.isActive {
    background-color: #555;
    color: #fff;
  }
`;

export default Home;
