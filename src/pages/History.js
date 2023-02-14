import { useEffect, useState } from "react";
import styled from "styled-components";

import { requestAxios } from "../hooks/requestAxios";

import Loading from "../components/Loading";
import Layout from "../components/structure/Layout";
import Row from "../components/FlexRow";
import VideoItemRow from "../components/VideoItemRow";
import Title from "../components/Title";

import { FaTrashAlt, FaSearch } from "react-icons/fa";

const HistoryPage = () => {
  const storageData = JSON.parse(localStorage.getItem("YT_History")) || null;
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState();

  const [query, setQuery] = useState("");

  const onChange = (e) => {
    setQuery(e.target.value);
  };
  console.log(videos);

  // console.log(storageData, videos);
  // id를 바탕으로 영상 정보 가져오기
  const getData = async () => {
    let arr = [];

    for (let storageItem of storageData) {
      const res = await requestAxios.get("videos", {
        params: { part: "snippet,statistics", id: storageItem.id },
      });
      arr.push(res.data.items[0]);
    }
    arr === [] ? setVideos(null) : setVideos([...new Set(arr)]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  // 재생목록 검색하기
  const handleSearch = () => {
    setLoading(true);

    const searchData = videos.filter((item) =>
      item.snippet.title.includes(query)
    );

    setVideos(searchData.length > 0 ? searchData : null);
    setLoading(false);
  };
  console.log(videos);
  // 시청 기록 지우기
  const removeHistory = () => {
    localStorage.removeItem("YT_History");
    setVideos(null);
  };

  if (storageData.length === 0 || !videos) {
    return (
      <Layout aside={true}>
        <Title text={"시청기록"} size={24} />
        <Container style={{ height: "calc(100vh-230px)" }}>
          <p>시청 기록이 없습니다.</p>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout aside={true}>
      <Title text={"시청기록"} size={24} />
      {loading ? (
        <Loading />
      ) : (
        <Row gap={20}>
          <Container height={"100%"}>
            {storageData.map((item) => (
              <>
                <p>{item.date}</p>
                {videos
                  .filter((video) => video.id === item.id)
                  .map((video) => (
                    <VideoItemRow {...video} key={video.id} />
                  ))}
              </>
            ))}
          </Container>
          <div>
            <Form onSubmit={handleSearch}>
              <FaSearch />
              <Input
                placeholder="시청 기록 검색"
                value={query}
                onChange={onChange}
              />
            </Form>

            <DeleteBtn onClick={removeHistory}>
              <FaTrashAlt />
              <p>시청 기록 지우기</p>
            </DeleteBtn>
          </div>
        </Row>
      )}
    </Layout>
  );
};
const Container = styled.div`
  padding: 20px 0;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid #555;
  padding-bottom: 4px;
  font-size: 1em;
  &:focus {
    outline: none;
    border-bottom: 2px solid #333;
  }
`;
const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  width: 14vw;
  flex-shrink: 0;
  cursor: pointer;
  &:hover {
    color: tomato;
  }
`;
export default HistoryPage;
