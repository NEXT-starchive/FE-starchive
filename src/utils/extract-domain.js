export function extractDomain(url) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // 호스트 이름을 '.'을 기준으로 분리합니다.
    const parts = hostname.split(".");

    // 부분들이 2개 이상일 때만 처리합니다.
    // 예: www.youtube.com -> ['www', 'youtube', 'com']
    if (parts.length > 2) {
      // 'www'를 제거하고 두 번째 부분을 반환합니다.
      return parts[1];
    } else {
      // 'www'가 없는 경우 첫 번째 부분을 반환합니다.
      return parts[0];
    }
  } catch (error) {
    console.error("Invalid URL:", error);
    return url;
  }
}
