import styled from "styled-components";
import Card from "./Card";
// import twitterMockData from "./twitterMockData.json";
import logoTwitter from "./img/logoTwitter.png";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const TwitterCard = () => {
  // 여기서 fetch 요청으로 데이터를 가져오고, 반복문으로 아래에서 Card를 충분히 만들기
  const [twitterData, setTwitterData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const titleUrl = "https://twitter.com/bts_bighit";
  const [loading, setLoading] = useState(false);

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

  //svg 파싱 및 (url)제거 함수
  const parseContentWithSvg = (content) => {
    // 결과를 담을 배열
    const contentElements = [];
    let lastIndex = 0;

    // SVG 이미지 URL과 백틱 문자를 찾는 정규식
    const svgUrlWithBackticksRegex =
      /`https:\/\/abs-0\.twimg\.com\/emoji\/v2\/svg\/[a-z0-9]+\.svg`/g;
    // 일반 URL을 찾는 정규식 및 제거
    const generalUrlRegex = /\(https?:\/\/\S+\)/g;
    content = content.replace(generalUrlRegex, "");

    // matchAll을 사용하여 모든 SVG URL을 찾습니다.
    for (const match of content.matchAll(svgUrlWithBackticksRegex)) {
      // 백틱(`) 문자를 제거합니다.
      const svgUrl = match[0].replace(/`/g, "");

      // 이전 텍스트를 배열에 추가합니다.
      const textBeforeImage = content.slice(lastIndex, match.index);
      if (textBeforeImage) {
        contentElements.push(textBeforeImage);
        // 줄바꿈을 추가합니다.
        contentElements.push(<br key={`br-${match.index}`} />);
      }

      // SVG 이미지를 React 요소로 변환하여 배열에 추가합니다.
      contentElements.push(
        <img
          key={match.index}
          src={svgUrl}
          alt="emoji"
          style={{ height: "1em", width: "1em" }}
        />
      );
      // 마지막 인덱스를 업데이트합니다.
      lastIndex = match.index + match[0].length;
    }

    // 마지막 SVG 이후의 텍스트를 배열에 추가합니다.
    const textAfterLastImage = content.slice(lastIndex);
    if (textAfterLastImage) {
      contentElements.push(textAfterLastImage);
    }

    return contentElements;
  };

  const loadMoreData = useCallback(async () => {
    if (hasMore && !loading) {
      setLoading(true); // 데이터 로딩 중 상태 설정
      try {
        const response = await axios.get(
          "http://ec2-15-164-39-246.ap-northeast-2.compute.amazonaws.com:8080/twitter",
          {
            params: {
              page,
              size: 5,
            },
          }
        );
        const newData = response.data.data.content.map((item) => {
          // SVG URL을 변환하여 새로운 속성에 저장
          item.parsedContent = parseContentWithSvg(item.content);
          return item;
        });
        setTwitterData((prevTwitterData) => [...prevTwitterData, ...newData]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.data.data.content.length > 0);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // 데이터 로딩 완료 상태 설정
      }
    }
  }, [page, hasMore, loading]);

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

    // 컴포넌트 마운트 시 첫 페이지 데이터 로드
    loadMoreData();
    // 이펙트 클린업으로 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreData]); // 의존성 배열에 loadMoreData 추가

  console.log(twitterData);

  return (
    <TwitterCardsContainer>
      {twitterData.map((content, index) => {
        return (
          <Card
            key={index}
            previewImgUrl={content.img}
            title={content.name}
            logoUrl={logoTwitter}
            releaseDate={formatDateString(content.uploadTime)}
            additionalInfo={content.parsedContent}
            contentUrl={content.url} // 변환된 내용을 전달
            titleUrl={titleUrl}
          />
        );
      })}
    </TwitterCardsContainer>
  );
};

export default TwitterCard;

const TwitterCardsContainer = styled.div`
  width: 280px;
`;
