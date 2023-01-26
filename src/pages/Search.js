import styled from "styled-components";

import { useSearchContext } from "../hooks/searchContext";

import Layout from "../components/structure/Layout";
import Title from "../components/Title";
import VideoItemRow from "../components/VideoItemRow";

// 검색 결과 페이지
// path={`/results/:search=${searchQuery.q}`}
const Search = () => {
  const { searchQuery } = useSearchContext();

  const { q, result } = searchQuery;

  if (!searchQuery.q) {
    return (
      <Layout aside={true}>
        <Title text={"검색어를 입력하세요"} />
      </Layout>
    );
  }
  return (
    <Layout aside={true}>
      <SearchContainer>
        <Title
          size={24}
          text={
            result.length === 0 ? "검색 결과가 없습니다." : `"${q}" 검색 결과`
          }
          mode={false}
        />

        {result && (
          <div style={{ width: "75vw" }}>
            {result.map((item) => (
              <VideoItemRow {...item} key={item.etag} />
            ))}
          </div>
        )}
      </SearchContainer>
    </Layout>
  );
};

const SearchContainer = styled.div`
  margin: 0 auto;
`;

export default Search;
