import { useEffect, useState } from "react";
import styled from "styled-components";

import { requestAxios } from "../hooks/requestAxios";

import Loading from "../components/Loading";
import Layout from "../components/Layout";
import Row from "../components/FlexRow";
import SearchItem from "../components/SearchItem";
import Title from "../components/Title";

import { FaTrashAlt, FaSearch } from "react-icons/fa";

const HistoryPage = () => {
  const storageD = JSON.parse(localStorage.getItem("YT_History")) || null;

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState();

  const [query, setQuery] = useState("");

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    list.filter((item) => item.snippet.title.includes(query));
  };

  // id를 바탕으로 영상 정보 가져오기
  const getData = async () => {
    let arr = [];
    for (let i = 0; i < storageD.length; i++) {
      const res = await requestAxios.get("videos", {
        params: { part: "snippet,statistics", id: storageD[i].id },
      });
      arr.push(res.data.items[0]);
    }
    setList(arr);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  if (!storageD || !list) {
    return (
      <Layout aside={true}>
        <div>
          <Title text={"시청기록"} size={24} />
          <Container list={true}>
            <p>시청 기록이 없습니다.</p>
          </Container>
        </div>
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
          <Container list={storageD}>
            {list.map((item) => (
              <SearchItem {...item} key={item.id} />
            ))}
          </Container>
          <div>
            <SideRow>
              <form onSubmit={handleSearch}>
                <FaSearch />
                <Input
                  placeholder="시청 기록 검색"
                  value={query}
                  onChange={onChange}
                />
              </form>
            </SideRow>
            <DeleteBtn>
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
  height: ${(props) => (props.list ? "100%" : `calc(100vh - 258px)`)};
  padding: 20px 0;
`;
const SideRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid #333;
  padding-bottom: 4px;
  font-size: 1em;
`;
const DeleteBtn = styled(SideRow)`
  width: 14vw;
  flex-shrink: 0;
  cursor: pointer;
`;
export default HistoryPage;
