export function ensureHttps(url) {
  // URL이 이미 "https://"로 시작하는지 확인합니다.
  if (!url.startsWith("https://")) {
    // "https://"를 앞에 추가합니다.
    return "https://" + url;
  }
  // URL이 이미 "https://"를 포함하고 있다면, 그대로 반환합니다.
  return url;
}
