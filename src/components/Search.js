import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

import { useSearchContext } from "../hooks/searchContext";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Search = () => {
  const [query, setQuery] = useState("");
  const { setSearchQuery } = useSearchContext();

  const navigate = useNavigate();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();

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
    },
    [query]
  );
  return (
    <SearchContainer>
      <form onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="검색"
          onChange={onChange}
          defaultValue={query}
        />
        <SearchBtn>
          <FaSearch />
        </SearchBtn>
      </form>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  height: 40px;
`;
const SearchInput = styled.input`
  width: 540px;
  height: 40px;
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
  height: 40px;
  background-color: #eee;
  padding: 10px;
  border: 2px solid #ccc;
  border-left: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  &:hover {
    border: 2px solid #999;
  }
`;

export default Search;
