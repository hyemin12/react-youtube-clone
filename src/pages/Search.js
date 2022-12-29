import Layout from "../components/Layout";
import Title from "../components/Title";
import VideoList from "../components/VideoList";
import { useSearchContext } from "../hooks/searchContext";

const Search = () => {
  const { searchQuery } = useSearchContext();
  console.log(searchQuery);
  const { q, result } = searchQuery;
  return (
    <Layout>
      <div>
        <Title size={24} text={`"${q}" 검색 결과`} mode={false} />

        <VideoList videos={result} />
      </div>
    </Layout>
  );
};

export default Search;
