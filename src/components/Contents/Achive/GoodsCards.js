import styled from "styled-components";
import Card from "./Card";
import goodsMockData from "./goodsMockData.json";
import logoGoods from "./img/logoGoods.jpg";

const GoodsCards = () => {
  //여기서 fetch 요청으로 데이터를 가져오고, 반복문으로 아래에서 Card를 충분히 만들기
  console.log("데이터 확인");
  console.log(goodsMockData);

  const contents = goodsMockData.data.content;
  console.log(contents);

  return (
    <GoodsCardsContainer>
      {contents.map((content) => (
        <LinkTo href={content.url}>
          <Card
            previewImgUrl={content.img}
            title={content.shop}
            logoUrl={logoGoods}
            relaseDate={content.uploadtime}
            additionalInfo={content.content}
          />
        </LinkTo>
      ))}
    </GoodsCardsContainer>
  );
};
export default GoodsCards;

const GoodsCardsContainer = styled.div`
  width: 280px;
`;

const LinkTo = styled.a`
  margin: 0 0;
  text-decoration: none;
  color: black;
`;
