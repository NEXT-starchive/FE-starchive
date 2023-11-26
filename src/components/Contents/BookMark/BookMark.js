import { styled } from "styled-components";
import BookMarkCreate from "./BookMarkCard/BookMarkCreate";
import BookMarkCard from "./BookMarkCard/BookMarkCard";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentBookMarkAtom } from "../../../recoil/atoms";
import BookMarkImage from "../../../assets/images/book-mark.png";

import { loadBookmark } from "../../../utils/local-storage";
import SectionTitle from "../../Common/SectionTitle";

const BookMark = () => {
  const [bookmarkData, setBookmarkData] = useRecoilState(currentBookMarkAtom);

  useEffect(() => {
    setBookmarkData([...loadBookmark()]);
  }, []);

  return (
    <BookMarkContainer>
      <BookMarkArea>
        <TitleContainer>
          <SectionTitle characterImgUrl={BookMarkImage} title="Book Mark" />
        </TitleContainer>
        {bookmarkData.map((bookmark) => {
          return (
            <BookMarkCard
              key={bookmark.url}
              localStorageUrl={bookmark.url}
              localStorageTitle={bookmark.title}
            />
          );
        })}
        <BookMarkCreate />
      </BookMarkArea>
    </BookMarkContainer>
  );
};

export default BookMark;

const BookMarkContainer = styled.div`
  box-sizing: border-box;
  padding: 50px 30px;
`;

const TitleContainer = styled.div`
  position: absolute;
  top: -40px;
  left: 0;
`;

const BookMarkArea = styled.div`
  position: relative;
  display: flex;
  max-width: 850px;
  /* overflow-x: auto; */
  align-items: flex-start;
  justify-content: space-between;
  padding: 30px 20px 7px;
  height: 101px;
  box-sizing: border-box;
  background: #f1ecf5;
  border-radius: 20px;

  & > div {
    margin-right: 20px;
  }
`;
