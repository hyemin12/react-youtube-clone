import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useSearchContext } from "../hooks/searchContext";
import { requestSearchVideos } from "../hooks/requestAxios";

import { FaSearch } from "react-icons/fa";

// 검색 컴포넌트 (input)
const Search = () => {
  const { setSearchQuery } = useSearchContext();

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      if (!query) return alert("검색어를 입력하세요");
      try {
        const res = await requestSearchVideos(query);

        setSearchQuery({ q: query, result: res.data.items });

        navigate(`/results/search=${query}`);
      } catch (err) {
        console.log(err);
      }
    },
    [query]
  );
  return (
    <Form onSubmit={handleSearch}>
      <SearchInput
        type="text"
        placeholder="검색"
        onChange={onChange}
        defaultValue={query}
      />
      <SearchBtn onClick={handleSearch}>
        <FaSearch />
      </SearchBtn>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  height: 40px;
`;
const SearchInput = styled.input`
  width: 540px;
  height: 40px;
  border: 2px solid #ccc;
  border-right: none;
  border-radius: 20px 0 0 20px;
  padding: 0 10px;
  font-size: 1em;
  outline: none;
  &:focus {
    border: 2px solid navy;
    box-shadow: inset 3px 3px 3px #eee;
  }
`;
const SearchBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 40px;
  background-color: #eee;
  border: 2px solid #ccc;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  &:hover {
    border: 2px solid #999;
  }
`;

export default Search;
