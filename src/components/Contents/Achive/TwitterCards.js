import styled from "styled-components";
import Card from "./Card";
import twitterMockData from "./twitterMockData.json";
import logoTwitter from "./img/logoTwitter.png";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { baseApiUrl } from "../../../constants/base-api-url";

const TwitterCard = () => {
  // 여기서 fetch 요청으로 데이터를 가져오고, 반복문으로 아래에서 Card를 충분히 만들기
  const [twitterData, setTwitterData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // useCallback을 사용하여 loadMoreData를 메모이제이션
  const loadMoreData = useCallback(async () => {
    if (hasMore) {
      try {
        const response = await axios.get(`${baseApiUrl}/twitter`, {
          params: {
            page,
            size: 10,
          },
        });
        setTwitterData((prevTwitterData) => [
          ...prevTwitterData,
          ...response.data.data.content,
        ]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.data.data.content.length > 0);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  }, [page, hasMore]); // 의존성 배열에 page와 hasMore 추가

  useEffect(() => {
    const handleScroll = (e) => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        loadMoreData();
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);
    // 이펙트 클린업으로 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreData]); // 의존성 배열에 loadMoreData 추가

  // Mock Data
  const contents = twitterMockData.data.content;
  console.log(contents);

  return (
    <TwitterCardsContainer>
      {contents.map((content, index) => (
        <LinkTo key={index} href={content.url}>
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
