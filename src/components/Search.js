import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <SearchContainer>
      <SearchInput type="text" placeholder="검색" />
      <SearchBtn>
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
  &:hover {
    border: 2px solid #999;
  }
`;

export default Search;
