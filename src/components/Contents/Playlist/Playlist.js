import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faCirclePlay,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

//img 가져오기
import bar from "./img/bar.png";
import music1 from "./img/1.png";
import music2 from "./img/2.png";
import music3 from "./img/3.png";
import music4 from "./img/4.png";
import music5 from "./img/5.png";
import music6 from "./img/6.png";
import music7 from "./img/7.png";
import calendar from "./img/calendar.png";
import AchiveTitle from "../Achive/AchiveTitle";
import PlayListTitle from "./PlayListTitle/PlayListTitle";

const songs = [
  {
    title: "Song Title 1",
    artist: "Artist Name 1",
    image: music1,
    link: "link-to-song/1",
  },
  {
    title: "Song Title 2",
    artist: "Artist Name 2",
    image: music2,
    link: "link-to-song/2",
  },
  {
    title: "hSong Title 3",
    artist: "Artist Name 3",
    image: music3,
    link: "link-to-song/3",
  },
  {
    title: "Song Title 4",
    artist: "Artist Name 4",
    image: music4,
    link: "link-to-song/4",
  },
  {
    title: "Song Title 5",
    artist: "Artist Name 5",
    image: music5,
    link: "link-to-song/5",
  },
  {
    title: "Song Title 6",
    artist: "Artist Name 6",
    image: music6,
    link: "link-to-song/6",
  },
  {
    title: "Song Title 7",
    artist: "Artist Name 7",
    image: music7,
    link: "link-to-song/7",
  },
];

const randomNum = Math.floor(Math.random() * 7) + 1;
const imagePath = songs[randomNum - 1].image;

const Icon = styled(FontAwesomeIcon)`
  margin: 0 10px;
  font-size: 24px; /* 아이콘 크기 조정 */
`;

const PlayListContainer = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding: 15px;
  height: 1000px;
  justify-content: center;
`;

const MusicPlayer = styled.div`
  width: 100%;
  max-width: 300px; /* 또는 원하는 너비 */
  height: 550px;
  background-color: #fff; /* 대체 색상 */
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 모든 내용이 둥근 모서리 내에 포함되도록 보장 */
  position: relative; /* 커버를 배경으로 배치하기 위함 */
`;

const AlbumCover = styled.div`
  width: 220px;
  height: 300px; /* 또는 원하는 높이 */
  background-position: center;
  background-size: cover;
  margin: 10px;
  opacity: 0.6; /* 필요에 따라 불투명도 조정 */
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
  flex-direction: column; /* 아이콘과 버튼을 수직으로 배열 */
  align-items: center; /* 아이콘과 버튼을 중앙에 배치 */
  padding: 10px;
`;

const PlayList = () => {
  return (
    <PlayListContainer>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img src={calendar} width="80" />
      </div> */}
      {/* <AchiveTitle title="playlist" characterImgUrl={calendar} /> */}
      <PlayListTitle title="Playlist" characterImgUrl={calendar} />
      <MusicPlayer>
        <AlbumCover imagePath={imagePath} />
        <SongInfo>
          <SongTitle>
            {randomNum === 1
              ? "Standing Next to You"
              : randomNum === 2
              ? "Butter"
              : randomNum === 3
              ? "DNA"
              : randomNum === 4
              ? "작은 것들을 위한 시 (Boy With Luv)"
              : randomNum === 5
              ? "RUN"
              : randomNum === 6
              ? "ON"
              : randomNum === 7
              ? "봄날"
              : `Song Title ${randomNum}`}
          </SongTitle>
          <ArtistName>
            {randomNum === 1
              ? "정국 (Jung Kook)"
              : randomNum === 2
              ? "BTS (방탄소년단)"
              : randomNum === 3
              ? "BTS (방탄소년단)"
              : randomNum === 4
              ? "BTS (방탄소년단)"
              : randomNum === 5
              ? "BTS (방탄소년단)"
              : randomNum === 6
              ? "BTS (방탄소년단)"
              : randomNum === 7
              ? "BTS (방탄소년단)"
              : `Artist Name ${randomNum}`}
          </ArtistName>
        </SongInfo>
        <Controls>
          <img src={bar} alt="Bar" width="200" />
          <div style={{ display: "flex" }}>
            <Icon icon={faBackward} />
            <a
              href={
                randomNum === 1
                  ? "https://www.youtube.com/watch?v=UNo0TG9LwwI"
                  : randomNum === 2
                  ? "https://www.youtube.com/watch?v=WMweEpGlu_U"
                  : randomNum === 3
                  ? "https://www.youtube.com/watch?v=MBdVXkSdhwU"
                  : randomNum === 4
                  ? "https://www.youtube.com/watch?v=XsX3ATc3FbA"
                  : randomNum === 5
                  ? "https://www.youtube.com/watch?v=5Wn85Ge22FQ"
                  : randomNum === 6
                  ? "https://www.youtube.com/watch?v=mPVDGOVjRQ0"
                  : "https://www.youtube.com/watch?v=xEeFrLSkMm8"
              }
            >
              <Icon icon={faCirclePlay} />
            </a>
            <Icon icon={faForward} />
          </div>
        </Controls>
      </MusicPlayer>
    </PlayListContainer>
  );
};

export default PlayList;
