import { styled } from "styled-components";
import Greeting from "./Greeting/Greeting";
import Search from "./Search/Search";
import Login from "./Login/Login";
import headerBackground from "./Greeting/img/headerBackground.png";

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <LoginContainer>
          <Login />
        </LoginContainer>

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
  background: url(${headerBackground}) center/cover no-repeat;
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
  justify-content: center;
  height: 100%;
  max-width: 1110px;
  margin: 0 auto;
`;
