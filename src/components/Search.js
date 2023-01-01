import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { useSearchContext } from "../hooks/searchContext";
import { useNavigate } from "react-router-dom";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Search = () => {
  const [query, setQuery] = useState("");
  const { setSearchQuery } = useSearchContext();

  const navigate = useNavigate();
  const onChange = useCallback(
    (e) => {
      setQuery(e.target.value);
    },
    [query]
  );

  const handleSearch = useCallback(async () => {
    try {
      if (query.length === 0) {
        alert("검색어를 입력하세요");
      } else {
        const res =
          await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=20&key=${KEY}
      `);

        setSearchQuery({ q: query, result: res.data.items });
        navigate(`/results/search=${query}`);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="검색"
        onChange={onChange}
        value={query}
      />
      <SearchBtn onClick={handleSearch}>
        <FaSearch />
      </SearchBtn>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  height: 40px;
`;
const SearchInput = styled.input`
  width: 540px;
  height: 100%;
  border: 2px solid #ccc;
  border-radius: 20px 0 0 20px;
  padding: 0 10px;
  margin-top: 1px;
  font-size: 1em;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border: 2px solid navy;
    box-shadow: inset 3px 3px 3px #eee;
  }
`;
const SearchBtn = styled.button`
  width: 60px;
  height: 100%;
  background-color: #eee;
  padding: 10px;
  border: 2px solid #ccc;
  border-left: none;
  border-radius: 0 20px 20px 0;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    border: 2px solid #999;
  }
`;

export default Search;
