import { styled } from "styled-components";
import { useState, useCallback } from "react";
import { debounce } from "lodash";

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
  flex: 2;
  height: 69px;
  box-sizing: border-box;
  border: 1px solid #000;
`;

const SearchContainer = styled.form`
  width: 736px;
  border-radius: 40px;
  border: 5px solid #d8d5e1;
  box-sizing: border-box;
  background: #faf8fb;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding-left: 78px;
`;

const SearchInput = styled.input`
  width: 500px;
  max-width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  background: transparent;
  border: none;
  border: 1px solid #333;
  border-radius: 0;
  box-sizing: border-box;
  font-size: 20px;

  color: #917f9e;

  &::placeholder {
    color: #cfcfcf;
  }

  &:focus {
    outline: none;
  }
`;
