import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  requestPopularVideos,
  requestSearchVideos,
} from "../hooks/requestAxios";

import Layout from "../components/structure/Layout";
import Loading from "../components/Loading";
import VideoList from "../components/VideoList";

import { FaAngleRight } from "react-icons/fa";
import SkeletonVideo from "../components/SkeletonVideo";

const Home = () => {
  const keywordRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const keywords = [
    { keyword: "인기", category: 0 },
    { keyword: "kpop", category: 10 },
    { keyword: "Playlist", category: "" },
    { keyword: "게임", category: 20 },
    { keyword: "뉴스", category: 25 },
    { keyword: "여행", category: "" },
    { keyword: "동물", category: 15 },
    { keyword: "심즈", category: "" },
    { keyword: "배구", category: "" },
    { keyword: "축구", category: "" },
    { keyword: "런닝맨", category: "" },
    { keyword: "그것이알고싶다", category: "" },
  ];

  /** 영상 목록 가져오는 함수 */
  const getData = useCallback(async () => {
    const { keyword, category } = keywords[currentTabIndex];

    try {
      if (currentTabIndex === 0) {
        // 인기 키워드
        const res = await requestPopularVideos();
        setVideos(res.data.items);
      } else if (typeof category === "number") {
        // 카테고리 아이디가 있는 경우
        const res = await requestPopularVideos(category);
        setVideos(res.data.items);
      } else {
        // 카테고리 아이디가 없는 경우
        const res = await requestSearchVideos(keyword);
        setVideos(res.data.items);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [currentTabIndex]);

  useEffect(() => {
    getData();
  }, [currentTabIndex]);

  /** 키워드 컨테이너 크기에 따라 overflow 상태 변경
   * keywordWidth: 키워드 컨테이너(고정값)
   * fullWidth: 키워드 컨테이너 전체 width값
   */
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (keywordRef.current) {
      const keywordWidth = keywordRef.current.clientWidth;

      const keywordSectionWidth =
        document.documentElement.clientWidth - 60 - 140 - 20;

      keywordSectionWidth < keywordWidth && setIsOverflow(true);
    }
  }, [isOverflow]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout aside={true}>
          <div id="main">
            <KeywordContainer style={{ display: "flex" }}>
              <SkeletonVideo />
              <Row ref={keywordRef}>
                {keywords.map(({ keyword }, idx) => (
                  <Keyword
                    key={keyword}
                    onClick={() => {
                      setCurrentTabIndex(idx);
                      setLoading(true);
                    }}
                    className={idx === currentTabIndex ? "isActive" : ""}
                  >
                    <p># {keyword}</p>
                  </Keyword>
                ))}
              </Row>

              {isOverflow && (
                <NextBtn>
                  <FaAngleRight />
                </NextBtn>
              )}
            </KeywordContainer>
            <VideoList videos={videos} />
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
