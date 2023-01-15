// 검색 결과 페이지 path={`/results/:search=${searchQuery.q}`}
import styled from "styled-components";

import { useSearchContext } from "../hooks/searchContext";

import Layout from "../components/Layout";
import Title from "../components/Title";
import VideoList from "../components/VideoList";
import SearchItem from "../components/SearchItem";

const Search = () => {
  const { searchQuery } = useSearchContext();

  const { q, result } = searchQuery;
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
          <ListContainer>
            {result.map((item) => (
              <SearchItem {...item} key={item.etag} />
            ))}
          </ListContainer>
        )}
      </SearchContainer>
    </Layout>
  );
};
const ListContainer = styled.div``;

const SearchContainer = styled.div`
  margin: 0 auto;
`;

export default Search;
