import styled from "styled-components";

const PlayListTitle = ({ characterImgUrl, title }) => {
  return (
    <AchiveTitleContainer>
      <CharacterImg style={{ backgroundImage: `url(${characterImgUrl})` }} />
      <TitleDiv>
        <Title>{title}</Title>
      </TitleDiv>
    </AchiveTitleContainer>
  );
};

export default PlayListTitle;
const AchiveTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0px -40px 10px;
`;

const CharacterImg = styled.div`
  width: 70px;
  height: 70px;
  margin: 0px 0px;
  padding: 0px 0px;
  position: relative;
  left: 5px;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 2;
`;

const TitleDiv = styled.div`
  width: 122px;
  height: 47px;
  border-radius: 30px;
  border: 5px solid #f1ecf5;
  background: #fff;

  display: flex;
  justify-content: left;
  align-items: center;
  margin: 0px 0px;
  position: relative;
  right: 18px;
  z-index: 1;
`;

const Title = styled.p`
  width: 107px;
  height: 23px;
  color: #917f9e;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 104.391%; /* 20.878px */
  letter-spacing: -0.1px;
  margin: 0px 0px;
`;
