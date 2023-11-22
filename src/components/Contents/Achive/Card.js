import styled from "styled-components";

const Card = ({
  previewImgUrl,
  title = "BTS_official",
  logoUrl = "",
  relaseDate,
  additionalInfo,
  hashTage = "",
}) => {
  return (
    <CardContainer>
      {/* <OgImg src={previewImgUrl} /> */}
      <PreviewImgDiv>
        <PreviewImg style={{ backgroundImage: `url(${previewImgUrl})` }} />
      </PreviewImgDiv>
      <ContentContainer>
        <Title>{title}</Title>
        <LogoImg style={{ backgroundImage: `url(${logoUrl})` }}></LogoImg>
        <RelaseDate> | {relaseDate}</RelaseDate>
      </ContentContainer>
      <ContentTextArea>{additionalInfo}</ContentTextArea>
      <HashTage>{hashTage}</HashTage>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  background: #f1ecf5;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: -20px 10px 23px 10px;
  width: 255px;
`;

const OgImg = styled.img`
  height: 151px;
`;
const PreviewImgDiv = styled.div`
  width: 235px;
  padding: 10px 10px;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
`;
const PreviewImg = styled.div`
  width: 100%;
  height: 151px;
  background-repeat: no-repeat;
  background-color: white;
  background-size: contain;
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

const HashTage = styled.div`
  color: #66a3d7;
  font-family: Helvetica Neue;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 13px 20px;
  width: 232px;
  text-align: left;
`;
