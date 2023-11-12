import { styled } from "styled-components";
import Greeting from "./Greeting/Greeting";
import Search from "./Search/Search";

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <LoginContainer>Login</LoginContainer>

        <SearchContainer>
          <Greeting />
          <Search />
        </SearchContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background: #dcd7ef;
  width: 100%;
  height: 280px;
`;

const LoginContainer = styled.div`
  justify-content: flex-end;
  width: 100%;
  text-align: right;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
