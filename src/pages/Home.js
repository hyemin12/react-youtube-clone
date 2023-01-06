import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import VideoList from "../components/VideoList";
import Nav from "../components/Nav";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const keywordRef = useRef(null);
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
    { keyword: "한일전", category: "" },
    { keyword: "한일전1", category: "" },
    { keyword: "한일전2", category: "" },
  ];

  const getData = useCallback(async () => {
    const current = keywords[currentIndex];

    try {
      if (currentIndex === 0) {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=contentDetails&chart=mostPopular&regionCode=kr&maxResults=32&key=${KEY}`
        );

        setResult(res.data.items);
      } else if (typeof current.category === "number") {
        const res =
          await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=contentDetails&chart=mostPopular&videoCategoryId=${current.category}&type=video&maxResults=32&regionCode=kr&key=${KEY}
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
  }, [currentIndex]);

  useEffect(() => {
    getData();
  }, [currentIndex]);

  // 화면 길이
  console.log(document.documentElement.clientWidth);
  console.dir(keywordRef.current, document);

  // clientWidth 1288
  // offsetWidth 1288
  // scrollWidth 1603
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
            <KeywordContainer style={{ display: "flex" }}>
              <Row ref={keywordRef}>
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
              <NextBtn>
                <FaAngleRight />
              </NextBtn>
            </KeywordContainer>
            {/* <VideoList videos={result} /> */}
          </div>
        </Layout>
      )}
    </>
  );
};
const Row = styled.div`
  display: flex;
  gap: 12px;
  width: calc(100vw - 250px);
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const KeywordContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  position: relative;
`;
const Keyword = styled(Link)`
  display: block;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 30px;
  flex-shrink: 0;
  &:hover {
    background-color: #eee;
  }
  &.isActive {
    background-color: #555;
    color: #fff;
  }
`;

const NextBtn = styled.button`
  diplay: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #eee;
  border: none;
  border-radius: 50%;
  font-size: 1em;
  position: absolute;
  right: -60px;
  cursor: pointer;
  &:hover {
    background-color: #a1a1a1;
    box-shadow: 2px 4px 4px #eee;
  }
`;

export default Home;
