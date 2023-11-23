import { styled } from "styled-components";
import {
  saveBookmark,
  removeUrlFromBookmark,
  loadBookmark,
} from "../../../../utils/local-storage";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { extractDomain } from "../../../../utils/extract-domain";
import { useRecoilState } from "recoil";
import { currentBookMarkAtom } from "../../../../recoil/atoms";
import { MoreVertical } from "lucide-react";
import { ensureHttps } from "../../../../utils/ensure-https";

const BookMarkCard = ({ localStorageUrl, localStorageTitle }) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(localStorageUrl);
  const [title, setTitle] = useState(localStorageTitle);
  const [bookmarkData, setBookmarkData] = useRecoilState(currentBookMarkAtom);

  const [faviconUrl, setFaviconUrl] = useState("");

  const [imgLoading, setImgLoading] = useState(false);

  const emptyFavicon =
    "https://upload.wikimedia.org/wikipedia/commons/c/c4/Globe_icon.svg";

  useEffect(() => {
    // const checkFavicon = async () => {
    //   try {
    //     const response = await axios.get(url + "/favicon.ico");
    //     if (response.status === 200) {
    //       setFaviconUrl(url + "/favicon.ico");
    //     } else {
    //       setFaviconUrl(""); // Favicon이 존재하지 않을 때
    //     }
    //   } catch (error) {
    //     setFaviconUrl(emptyFavicon); // 오류 발생 시
    //   }
    // };

    // checkFavicon();

    const img = new Image();
    img.onload = () => setImgLoading(true); // 이미지 로드 성공 시
    img.onerror = () => setImgLoading(false); // 이미지 로드 실패 시

    img.src = url + "/favicon.ico"; // 이미지 소스 설정

    // window 객체에 클릭 이벤트 리스너를 추가합니다.
    window.addEventListener("click", handleClickOutside);

    // 컴포넌트가 언마운트될 때 리스너를 제거합니다.
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen(!open);

    if (ref.current) {
      console.log(ref.current.offsetLeft, window.innerWidth);
      //   alert(ref.current.offsetLeft);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const createBookMark = (event) => {
    event.stopPropagation();
    const bookmarkData = {
      title: title || extractDomain(url) || "제목 없음",
      url: ensureHttps(url),
    };

    const prevBookMark = loadBookmark();
    saveBookmark([...prevBookMark, bookmarkData]);

    setOpen(false);
  };

  const deleteBookMark = (event) => {
    event.stopPropagation();
    const response = removeUrlFromBookmark(localStorageUrl);
    setBookmarkData([...response]);
  };

  const moveToUrl = () => {
    alert(localStorageUrl);
    window.location.href = url;
  };

  return (
    <BookMarkCardContainer onClick={moveToUrl} ref={ref}>
      <BookMarkImgBox>
        {imgLoading ? (
          <BookMarkImg src={url + "/favicon.ico"} />
        ) : (
          <BookMarkImg src={emptyFavicon} />
        )}
      </BookMarkImgBox>
      <BookMarkTitle>{localStorageTitle}</BookMarkTitle>
      <MenuBox onClick={handleClick}>
        <MoreVertical />
      </MenuBox>
      {open && (
        <InputBox
          //   width={ref.current.offsetLeft}
          widthOver={ref.current.offsetLeft + 350 > window.innerWidth}
        >
          <InputUrl
            defaultValue={localStorageUrl}
            placeholder="수정할 URL을 입력하세요"
            onChange={(event) => setUrl(event.target.value)}
          />
          <InputTitle
            defaultValue={localStorageTitle}
            placeholder="수정할 TITLE을 입력하세요"
            onChange={(event) => setTitle(event.target.value)}
          />
          <ButtonGroup>
            <CancelButton onClick={handleClick}>취소</CancelButton>
            <DeleteButton onClick={deleteBookMark}>삭제</DeleteButton>
            <CreateButton onClick={createBookMark}>수정</CreateButton>
          </ButtonGroup>
        </InputBox>
      )}
    </BookMarkCardContainer>
  );
};

export default BookMarkCard;

const BookMarkCardContainer = styled.div`
  position: relative;
`;

const BookMarkImgBox = styled.div`
  width: 100%;
  height: 100%;
  width: 44px;
  height: 44px;
`;

const BookMarkImg = styled.img`
  object-fit: cover;
  width: 44px;

  padding: 5px;
  box-sizing: border-box;
`;

const BookMarkTitle = styled.p`
  color: #917f9e;
  margin: 0;
`;

const MenuBox = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;

  & svg {
    width: 15px;
  }
`;

const InputBox = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  padding: 30px 20px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  z-index: 1;

  left: ${({ widthOver }) => (widthOver ? "-600%" : "50%")};
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  margin-bottom: 20px;
  padding: 3px 10px;
  border-radius: 10px;
  border: 1px solid #917f9e;
`;

const InputUrl = styled(Input)`
  margin-bottom: 20px;
`;

const InputTitle = styled(Input)``;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  box-sizing: border-box;
  padding: 10px;
`;

const Button = styled.button`
  width: 70px;
  height: 40px;
  border-radius: 10px;
  border: none;
`;

const CancelButton = styled(Button)`
  cursor: pointer;
  margin-right: 20px;
`;

const DeleteButton = styled(Button)`
  cursor: pointer;
  margin-right: 20px;
`;

const CreateButton = styled(Button)`
  cursor: pointer;

  background: #f1ecf5;
`;
