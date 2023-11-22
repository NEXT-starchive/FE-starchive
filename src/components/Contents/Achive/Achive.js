import styled from "styled-components";
import AchiveTitle from "./AchiveTitle";
import TwitterCards from "./TwitterCards";
import GoodsCards from "./GoodsCards";
import YoutubeCards from "./YoutubeCards";
//logoUrl
import logoTwitter from "./img/logoTwitter.png";

import characterTwitter from "./img/Twitter.jpg";
import characterYoutube from "./img/Youtube.jpg";
import characterGoods from "./img/Goods.jpg";

const Achive = () => {
  const date = "2023.10.25";
  // const contentYoutube = "sample contentYoutube";
  // const contentGoods = "sample contentGoods";
  return (
    <AchiveContainer>
      {/* <Card
        previewImgUrl={logoTwitter}
        logoUrl={logoTwitter}
        title="Twitter"
        relaseDate={date}
        additionalInfo={<span>Some more info here</span>}
        hashTage="#뷔 #V #SlowDancing"
      /> */}
      <AchiveDiv>
        <AchiveTitle characterImgUrl={characterTwitter} title="Twitter" />
        <TwitterCards />
      </AchiveDiv>
      <AchiveDiv>
        <AchiveTitle characterImgUrl={characterYoutube} title="Youtube" />
        <YoutubeCards />
      </AchiveDiv>
      <AchiveDiv>
        <AchiveTitle characterImgUrl={characterGoods} title="Goods" />
        <GoodsCards />
      </AchiveDiv>
    </AchiveContainer>
  );
};

export default Achive;

const AchiveContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid red;
  height: 1000px;

  display: flex;
  justify-content: space-around;
`;

const AchiveDiv = styled.div``;
