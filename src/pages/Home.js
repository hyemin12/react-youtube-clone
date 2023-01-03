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
  const keywords = ["인기", "kpop", "음악", "게임", "요리", "배구", "축구"];

  const getData = async () => {
    try {
      if (currentIndex === 0) {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&regionCode=kr&maxResults=32&key=${KEY}`
        );
        setResult(res.data.items);
      } else {
        const res =
          await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keywords[currentIndex]}&maxResults=20&key=${KEY}
      `);
        setResult(res.data.items);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

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
              {keywords.map((word, idx) => (
                <Keyword
                  key={word}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setLoading(true);
                  }}
                  className={idx === currentIndex ? "isActive" : ""}
                >
                  <p># {word}</p>
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
