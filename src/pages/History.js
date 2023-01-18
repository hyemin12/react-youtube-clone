import { useEffect, useState } from "react";
import styled from "styled-components";
import Row from "../components/FlexRow";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import SearchItem from "../components/SearchItem";
import Title from "../components/Title";
import { requestAxios } from "../hooks/requestAxios";

const HistoryPage = () => {
  const storageD = JSON.parse(localStorage.getItem("YT_History")) || null;
  console.log(storageD);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState();

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
  console.log(list);
  if (!storageD) {
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
      <Title text={"시청기록"} />
      {loading ? (
        <Loading />
      ) : (
        <Row gap={20}>
          <Container list={storageD}>
            {list.map((item) => (
              <SearchItem {...item} />
            ))}
          </Container>
          <DeleteBtn>시청 기록 삭제</DeleteBtn>
        </Row>
      )}
    </Layout>
  );
};
const Container = styled.div`
  height: ${(props) => (props.list ? "100%" : `calc(100vh - 258px)`)};
  padding: 20px 0;
`;
const DeleteBtn = styled.p`
  flex-shrink: 0;
  padding: 0 20px;
  cursor: pointer;
`;
export default HistoryPage;
