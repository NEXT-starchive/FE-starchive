import { styled } from "styled-components";
import PlayList from "./Playlist/Playlist";
import BookMark from "./BookMark/BookMark";
import Achive from "./Achive/Achive";

const Contents = () => {
  return (
    <>
      <ContentsContainer>
        <PlayListContainer>
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
`;

const PlayListContainer = styled.div`
  width: 100%;
  flex: 1;
`;

const MainContainer = styled.div`
  width: 100%;
  flex: 2;
  border: 1px solid #000;
`;
