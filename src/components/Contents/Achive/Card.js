import styled from "styled-components";

const Card = ({
  previewImgUrl,
  title = "BTS_official",
  logoUrl = "",
  releaseDate = "",
  additionalInfo,
  goodsName = "",
  area = "",
  contentUrl = "",
  titleUrl = "",
}) => {
  return (
    <CardContainer>
      {/* <OgImg src={previewImgUrl} /> */}
      <LinkTo href={contentUrl} target="_blank">
        <PreviewImgDiv>
          <PreviewImg style={{ backgroundImage: `url(${previewImgUrl})` }} />
        </PreviewImgDiv>
      </LinkTo>
      <ContentContainer>
        <LinkTo href={titleUrl} target="_blank">
          <Title>{title}</Title>
        </LinkTo>
        <LogoImg style={{ backgroundImage: `url(${logoUrl})` }}></LogoImg>
        <RelaseDate> | {releaseDate}</RelaseDate>
      </ContentContainer>
      <TextArea>
        <GoodsName>{goodsName}</GoodsName>
        <Area>{area}</Area>
        <ContentTextArea>{additionalInfo}</ContentTextArea>
      </TextArea>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  background: #f1ecf5;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* overflow: hidden; */
  word-wrap: break-word;
  padding-bottom: 10px;
  margin: -20px 10px 33px 10px;
  width: 255px;
`;

const PreviewImgDiv = styled.div`
  width: 235px;
  padding: 10px 10px;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  overflow: hidden;
`;

const PreviewImg = styled.div`
  width: 100%;
  height: 151px;
  background-repeat: no-repeat;
  background-color: white;
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0px 0px;
`;

const ContentContainer = styled.div`
  padding: 10px 20px;

  display: flex;
  align-items: center; // 가운데 정렬
`;

const LogoImg = styled.div`
  width: 16px;
  height: 16px;
  background-size: cover;
  background-position: center;
  margin: 0 4px;
`;

const Title = styled.h2`
  font-size: 15px;
  font-weight: 700;
  margin: 0 20px;
  color: #333;

  margin: 0 0; // 위아래 마진 설정
`;

const RelaseDate = styled.p`
  font-size: 13px;
  color: #666;
  font-weight: 600;

  margin: 0 0; // 위아래 마진 설정
`;

const ContentTextArea = styled.div`
  font-size: 13px;

  margin: 0 20px;
  width: 232px;
  text-align: left;
`;

const GoodsName = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin: 0 20px;
  width: 232px;
  text-align: left;
`;
const Area = styled.div`
  font-size: 13px;

  margin: 0 20px;
  width: 232px;
  text-align: left;
`;

const LinkTo = styled.a`
  text-decoration: none !important;
  color: inherit;
`;

const TextArea = styled.div``;
