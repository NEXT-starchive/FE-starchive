import { styled } from "styled-components";
import PlayList from "./Playlist/Playlist";
import BookMark from "./BookMark/BookMark";
import Achive from "./Achive/Achive";
import Firstday from "./Firstday/Firstday";

const Contents = () => {
  return (
    <>
      <ContentsContainer>
        <PlayListContainer>
          <Firstday />
          <PlayList />
        </PlayListContainer>

        <MainContainer>
          <BookMark />
          <Achive />
        </MainContainer>
      </ContentsContainer>
    </>
  );
};

export default Contents;

const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  max-width: 1110px;
  margin: 0 auto;
`;

const PlayListContainer = styled.div`
  width: 100%;
  flex: 1;
`;

const MainContainer = styled.div`
  width: 100%;
  flex: 2;
`;
