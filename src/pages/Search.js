import { useSearchContext } from "../hooks/searchContext";

const Search = () => {
  console.log("서치컴포넌트");
  const { searchQuery } = useSearchContext();
  console.log(searchQuery);
  return <div>검색결과창</div>;
};

export default Search;
