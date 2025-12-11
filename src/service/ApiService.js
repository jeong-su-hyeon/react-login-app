// 사용자 인증 및 API 유틸리티 
import { API_BASE_URL } from "../api-config";

// [API 호출 메서드]
export function call(api, method, request) {
    // [HTTP 헤더] 요청 헤더 및 Concept-Type 설정
    let headers = new Headers( {
        "Concept-Type": "application/json", 
    });

    // [토큰] 로컬 스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    // 토큰이 존재하면 Authorization 헤더에 추가
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    // fetch 요청 옵션 구성
    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method
    };

    // request 객체가 있으면 JSON 문자열로 변환해 body에 추가
    if (request) {
        options.body = JSON.stringify(request);
    }

    // fetch로 API 호출
    return fetch(options.url, options)
        .then((response) => {
            // 정상 응답 (200 OK)
            if (response.status == 200) {
                return response.json();
            }
            // 인증 오류 (403 Forbidden)
            else if (response.status === 403) {
                window.location.href = "/login"; // 로그인 페이지로 리다이렉트
            }
            // 그 외 오류 - Error 객체로 생성
            else {
                new Error(response);
            }
        })
        .catch((error) => {
            console.log("[HTTP ERROR]");
            console.log(error);
        });
}

// [로그인] userDTO를 POST로 전달
export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO).then((response) => {
        // 로그인 성공 시
        if (response.token) { 
            localStorage.setItem("ACCESS_TOKEN", response.token); // 토큰 저장
            window.location.href = "/"; // 홈으로 리다이렉트
        }
    });
}

// [로그아웃] 토큰 제거 후 로그인 페이지로 이동
export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null); // 토큰 제거
    window.location.href = "/login"; // 로그인 페이지로 리다이렉트
}

// [회원가입] userDTO를 POST로 전달
export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
}

// [소셜 로그인] provider에 따라 OAUth2 인증 
export function socialLogin(provider) {
    // 프론트엔드 URL 
    const frontendUrl = window.location.protocol + "//" + window.location.host;
    console.log("frontendUrl = " + frontendUrl);

    // 소셜 로그인 URL로 리다이렉트 (OAuth2 인증)
    // -> 사용자가 "로그인" 버튼을 누르면 
    // -> 현재 프론트엔드 주소를 redirect_url로 설정
    // -> 백엔드에서 제공하는 OAuth2 인증 엔드포인트로 사용자 리다이렉트
    // (프론트엔드에서 로그인 처리를 직접하지 않고, 백엔드에서 인증 절차 처리하도록 위임)
    window.location.href =
        API_BASE_URL + "/oauth2/authorization/" + provider + "?redirect_url=" + frontendUrl;
}
