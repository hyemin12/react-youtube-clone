import Layout from "../components/Layout";
import Title from "../components/Title";
import VideoList from "../components/VideoList";
import { useSearchContext } from "../hooks/searchContext";

const Search = () => {
  const { searchQuery } = useSearchContext();

  const { q, result } = searchQuery;
  return (
    <Layout aside={true}>
      <div>
        <Title
          size={24}
          text={q.length === 0 ? "검색 결과가 없습니다." : `"${q}" 검색 결과`}
          mode={false}
        />

        <VideoList videos={result} />
      </div>
    </Layout>
  );
};

export default Search;
