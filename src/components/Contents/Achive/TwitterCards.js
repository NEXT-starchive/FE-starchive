import styled from "styled-components";
import Card from "./Card";
import twitterMockData from "./twitterMockData.json";
import logoTwitter from "./img/logoTwitter.png";

const TwitterCard = () => {
  //여기서 fetch 요청으로 데이터를 가져오고, 반복문으로 아래에서 Card를 충분히 만들기
  console.log("데이터 확인");
  console.log(twitterMockData);

  const contents = twitterMockData.data.content;
  console.log(contents);

  return (
    <TwitterCardsContainer>
      {contents.map((content) => (
        <LinkTo href={content.url}>
          <Card
            previewImgUrl={content.img}
            title={content.name}
            logoUrl={logoTwitter}
            relaseDate={content.uploadtime}
            additionalInfo={content.content}
          />
        </LinkTo>
      ))}
    </TwitterCardsContainer>
  );
};
export default TwitterCard;

const TwitterCardsContainer = styled.div`
  width: 280px;
`;

const LinkTo = styled.a`
  margin: 0 0;
  text-decoration: none;
  color: black;
`;
