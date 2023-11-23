import { styled } from "styled-components";
import music1 from "./1.jpg";

const MusicPlayer = styled.div`
  width: 100%;
  max-width: 300px; /* 또는 원하는 너비 */
  background-color: #fff; /* 대체 색상 */
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 모든 내용이 둥근 모서리 내에 포함되도록 보장 */
  position: relative; /* 커버를 배경으로 배치하기 위함 */
`;

const AlbumCover = styled.div`
  width: 100%;
  height: 200px; /* 또는 원하는 높이 */
  background-size: cover;
  background-position: center;
  opacity: 0.5; /* 필요에 따라 불투명도 조정 */
  background-image: url("${(props) => props.imagePath}");
`;

const SongInfo = styled.div`
  padding: 10px;
`;

const SongTitle = styled.h1`
  margin: 0;
  font-size: 1.2em;
`;

const ArtistName = styled.p`
  margin: 0;
  font-size: 1em;
  color: #666;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;

const PlayButton = styled.a`
  display: inline-block;
  /* 재생 버튼에 대한 스타일 추가 */
`;

// 이미지와 링크는 랜덤으로 1부터 15 사이의 숫자 하나를 할당
const randomNum = Math.floor(Math.random() * 15) + 1;
const imagePath = `path/to/local/image/${randomNum}.png`;
const songLink = `link-to-song/${randomNum}`;

const PlayList = () => {
  return (
    <PlayListContainer>
      <MusicPlayer>
        {/* <AlbumCover imagePath={imagePath} /> */}
        <AlbumCover imagePath={music1} />
        <SongInfo>
          <SongTitle>Song Title {randomNum}</SongTitle>
          <ArtistName>Artist Name</ArtistName>
        </SongInfo>
        <Controls>
          <PlayButton href={songLink}>Play</PlayButton>
        </Controls>
        {/* 다른 컴포넌트 또는 요소 */}
      </MusicPlayer>
    </PlayListContainer>
  );
};

export default PlayList;

const PlayListContainer = styled.div`
  flex: 1;
  box-sizing: border-box;
  border: 1px solid #000;
  height: 1000px;
`;
