import styled from "styled-components";

const AchiveTitle = ({ characterImgUrl, title, titleUrl }) => {
  return (
    <AchiveTitleContainer>
      <CharacterImgDiv>
        <CharacterImg style={{ backgroundImage: `url(${characterImgUrl})` }} />
      </CharacterImgDiv>
      <TitleDiv>
        <LinkTo href={titleUrl} target="_blank">
          <Title>{title}</Title>
        </LinkTo>
      </TitleDiv>
    </AchiveTitleContainer>
  );
};

export default AchiveTitle;
const AchiveTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0px -40px 10px;
`;
const CharacterImgDiv = styled.div`
  width: 70px;
  height: 70px;
`;
const CharacterImg = styled.div`
  width: 70px;
  height: 70px;
  margin: 0px 0px;
  padding: 0px 0px;
  position: relative;
  left: 5px;
  background-repeat: no-repeat;
  z-index: 1;
  object-fit: cover;
`;

const TitleDiv = styled.div`
  width: 95px;
  height: 47px;
  border-radius: 30px;
  border: 5px solid #f1ecf5;
  background: #fff;
  font-weight: 1500px;
  font-weight: bolder;

  display: flex;
  justify-content: left;
  align-items: center;
  margin: 0px 0px;
  position: relative;
  right: 18px;
  padding: 0px 0px;
`;

const Title = styled.div`
  width: 95px;
  height: 23px;
  color: #917f9e;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: bolder;
  line-height: 104.391%; /* 20.878px */
  letter-spacing: -0.1px;
  margin: 0px 0px;
  padding: 0px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LinkTo = styled.a`
  text-decoration: none;
  margin: 0px 0px;
  padding: 0px 0px;
`;
