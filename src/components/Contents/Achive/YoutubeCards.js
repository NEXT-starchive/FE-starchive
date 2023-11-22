import styled from "styled-components";
import Card from "./Card";
import youtubeMockData from "./youtubeMockData.json";
import logoYoutube from "./img/logoYoutube.png";

const YoutubeCard = () => {
  //여기서 fetch 요청으로 데이터를 가져오고, 반복문으로 아래에서 Card를 충분히 만들기
  console.log("데이터 확인");
  console.log(youtubeMockData);

  const contents = youtubeMockData.data.content;
  console.log(contents);

  return (
    <YoutubeCardsContainer>
      {contents.map((content) => (
        <LinkTo href={content.url}>
          <Card
            previewImgUrl={content.img}
            title={content.name}
            logoUrl={logoYoutube}
            relaseDate={content.uploadtime}
            additionalInfo={content.title} // youtube는 내용말고 제목만 가져옴
          />
        </LinkTo>
      ))}
    </YoutubeCardsContainer>
  );
};
export default YoutubeCard;

const YoutubeCardsContainer = styled.div`
  width: 280px;
`;

const LinkTo = styled.a`
  margin: 0 0;
  text-decoration: none;
  color: black;
`;
