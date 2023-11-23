export function saveBookmark(data) {
  // LocalStorage에서 기존 북마크 불러오기
  const bookmarks = JSON.parse(localStorage.getItem("bookmark")) || [];

  // 새로운 북마크의 URL이 이미 존재하는지 확인
  const exists = bookmarks.some((bookmark) => bookmark.url === data.url);

  if (!exists) {
    // 존재하지 않는 경우, 새로운 북마크 추가
    bookmarks.push(data);
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
    alert("북마크가 추가되었습니다.");
    return bookmarks;
  } else {
    // 이미 존재하는 경우, 추가하지 않음
    alert("이미 존재하는 북마크가 있습니다.");
    return bookmarks;
  }
}

export function loadBookmark() {
  const data = localStorage.getItem("bookmark");
  return data ? JSON.parse(data) : [];
}

export function removeUrlFromBookmark(urlToRemove) {
  // LocalStorage에서 북마크 데이터 불러오기
  const bookmarks = JSON.parse(localStorage.getItem("bookmark")) || [];

  // 특정 URL을 제외한 새 배열 생성
  const updatedBookmarks = bookmarks.filter(
    (bookmark) => bookmark.url !== urlToRemove
  );

  // 변경된 배열을 다시 LocalStorage에 저장
  localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
  return updatedBookmarks;
}
