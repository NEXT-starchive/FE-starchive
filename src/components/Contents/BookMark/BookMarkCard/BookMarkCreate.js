import { styled } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { saveBookmark, loadBookmark } from "../../../../utils/local-storage";
import { extractDomain } from "../../../../utils/extract-domain";
import { useRecoilState } from "recoil";
import { currentBookMarkAtom } from "../../../../recoil/atoms";
import { ensureHttps } from "../../../../utils/ensure-https";

const BookMarkCreate = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [bookmarkData, setBookmarkData] = useRecoilState(currentBookMarkAtom);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const createBookMark = () => {
    if (!url) return alert("URL을 입력해주세요");

    const bookmarkData = {
      title: title || extractDomain(url) || "제목 없음",
      url: ensureHttps(url),
    };

    const prevBookMark = loadBookmark();
    const response = saveBookmark(bookmarkData);
    setBookmarkData([...response]);

    setOpen(false);
    setUrl("");
    setTitle("");
  };

  useEffect(() => {
    // window 객체에 클릭 이벤트 리스너를 추가합니다.
    window.addEventListener("click", handleClickOutside);

    // 컴포넌트가 언마운트될 때 리스너를 제거합니다.
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <BookMarkCardContainer ref={ref}>
      <BookMarkBox onClick={handleClick}>
        <Plus color="#f1ecf5" />
      </BookMarkBox>
      {open && (
        <InputBox widthOver={ref.current.offsetLeft + 350 > window.innerWidth}>
          <InputUrl
            placeholder="URL을 입력하세요"
            onChange={(event) => setUrl(event.target.value)}
          />
          <InputTitle
            placeholder="TITLE을 입력하세요"
            onChange={(event) => setTitle(event.target.value)}
          />
          <ButtonGroup>
            <DeleteButton onClick={handleClick}>취소</DeleteButton>
            <CreateButton onClick={createBookMark}>생성</CreateButton>
          </ButtonGroup>
        </InputBox>
      )}
    </BookMarkCardContainer>
  );
};

export default BookMarkCreate;

const BookMarkCardContainer = styled.div`
  position: relative;
`;

const BookMarkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: #fff;
  border-radius: 44px;
  cursor: pointer;
`;

const InputBox = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  padding: 30px 20px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  z-idex: 1;

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

const DeleteButton = styled(Button)`
  cursor: pointer;
  margin-right: 20px;
`;

const CreateButton = styled(Button)`
  cursor: pointer;

  background: #f1ecf5;
`;
