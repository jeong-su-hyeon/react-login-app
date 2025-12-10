// 백엔드 서버 주소
let backendHost;

// 브라우저의 호스트 이름 (ex. localhost, 도메인 이름 등)
const hostname = window && window.location && window.location.hostname;

// localhost일 경우, backendHost 경로 지정
if (hostname === "localhost") {
	backendHost = "http://localhost:8080";
}

// 최종적으로 사용할 API 기본 URL
export const API_BASE_URL = `${backendHost}`;
