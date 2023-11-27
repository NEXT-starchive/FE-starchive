import { styled } from "styled-components";
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import SearchIconImage from "../../../assets/images/search-icon.png";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce된 함수를 생성합니다.
  const debouncedSave = useCallback(
    debounce((nextValue) => setSearchTerm(nextValue), 100),
    [] // 의존성 배열이 비어있음을 확인합니다.
  );

  const handleInputChange = (event) => {
    debouncedSave(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출에 의한 페이지 새로고침 방지
    // 검색 로직 구현
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
      searchTerm
    )}`;
  };

  return (
    <SearchComponent>
      <SearchContainer onSubmit={handleSubmit}>
        <SearchIcon imageUrl={SearchIconImage} />
        <SearchInput
          placeholder="검색어를 입력해주세요."
          onChange={handleInputChange}
        />
      </SearchContainer>
    </SearchComponent>
  );
};

export default Search;

const SearchComponent = styled.div`
  display: flex;
  height: 69px;
  box-sizing: border-box;
`;

const SearchIcon = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 5px;
`;

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 45vw;
  height: 8vh;
  border-radius: 40px;
  border: 5px solid #d8d5e1;
  box-sizing: border-box;
  background: #faf8fb;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 3px;
  padding-left: 20px;
  margin-right: auto;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  background: transparent;
  border: none;
  border-radius: 0;
  box-sizing: border-box;
  font-size: 20px;

  color: #917f9e;
  font-weight: 700;

  &::placeholder {
    color: #cfcfcf;
  }

  &:focus {
    outline: none;
  }
`;
