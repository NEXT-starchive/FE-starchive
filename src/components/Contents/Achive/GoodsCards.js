import styled from "styled-components";
import Card from "./Card";
// import goodsMockData from "./goodsMockData.json";
import logoGoods from "./img/logoGoods.jpg";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const GoodsCards = () => {
  //여기서 fetch 요청으로 데이터를 가져오고, 반복문으로 아래에서 Card를 충분히 만들기
  const [goodsData, setGoodsData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const titleUrl =
    "https://m.bunjang.co.kr/search/products?q=%EB%B0%A9%ED%83%84%EC%86%8C%EB%85%84%EB%8B%A8";

  //날짜 파싱 함수
  function formatDateString(dateString) {
    // dateString이 유효한지 체크합니다.
    if (!dateString) {
      // 유효한 문자열이 아닐 경우, 적절한 기본값을 반환하거나 오류를 처리합니다.
      console.error("Invalid dateString:", dateString);
      return "Invalid date";
    }
    // ISO 문자열을 "YYYY-MM-DD" 형식으로 자릅니다.
    const [date] = dateString.split("T");
    // 날짜를 구성하는 연, 월, 일을 분리합니다.
    const [year, month, day] = date.split("-");
    // "YYYY.MM.DD" 형식으로 조립합니다.
    const newDate = `${year}.${month}.${day}`;
    console.log(`newDate = ${newDate}`);
    return newDate;
  }
  //useCallback을 사용하여
  const loadMoreData = useCallback(async () => {
    if (hasMore) {
      try {
        const response = await axios.get(
          "http://ec2-15-164-39-246.ap-northeast-2.compute.amazonaws.com:8080/goods",
          {
            params: {
              page,
              size: 5,
            },
          }
        );
        setGoodsData((preTwitterData) => [
          ...preTwitterData,
          ...response.data.data.content,
        ]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.data.data.content.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [page, hasMore]);

  useEffect(() => {
    const handleScroll = (e) => {
      loadMoreData();

      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        loadMoreData();
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 마운트 시 첫 페이지 데이터 로드
    loadMoreData();

    // 이펙트 클린업으로 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreData]); // 의존성 배열에 loadMoreData 추가

  console.log(goodsData);
  return (
    <GoodsCardsContainer>
      {goodsData.map((content) => (
        <Card
          previewImgUrl={content.img}
          title={content.shop}
          logoUrl={logoGoods}
          releaseDate={formatDateString(content.uploadTime)}
          goodsName={`-상품명 : ${content.title}`}
          area={`-지역 : ${content.area}`}
          additionalInfo={`-가격 : ${content.price}원`}
          contentUrl={content.url}
          titleUrl={titleUrl}
        />
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
