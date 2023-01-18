import { useEffect, useState } from "react";
import styled from "styled-components";
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
          <Container list={storageD}>
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
        <Container>
          {list.map((item) => (
            <SearchItem {...item} />
          ))}
        </Container>
      )}
    </Layout>
  );
};
const Container = styled.div`
  height: ${(props) => (props.list ? "100%" : `calc(100vh - 258px)`)};
  padding: 20px 0;
`;
export default HistoryPage;
