import React from "react";
import { Navigate } from "react-router-dom";

// [소셜 로그인 컴포넌트] 소셜 로그인 성공 후 리다이렉션 처리
// 1) 소셜 로그인 성공 후, 백엔드에서 전달해주는 토큰을 저장 
// 2) 사용자를 지정 페이지로 리다이렉트
const SocialLogin = (props) => {
    // 쿼리 파라미터에서 특정 값 추출
    // URL에서 token 값 추출
    const getUrlParameter = (name) => {
        let search = window.location.search;      // 현재 URL의 쿼리스트링 부분
        let params = new URLSearchParams(search); // URLSearchParams 파싱
        return params.get(name);                  // 주어진 name의 파라미터 값을 반환
    };

    const token = getUrlParameter("token"); // 쿼리 파라미터에서 토큰 값 추출
    console.log("토큰 파싱 " + token);       // 콘솔에 토큰 출력

    // [토큰이 존재할 경우] 토큰 저장
    if (token) {
        // 토큰 로컬스토리에 저장
        console.log("로컬 스토리지에 토큰 저장 " + token);
        localStorage.setItem("ACCESS_TOKEN", token);

        // 홈 페이지로 리다이렉션, 이전 위치 정보와 함께 전달
        return (
            <Navigate
                to={{
                    pathname: "/",                   // 메인 페이지로 이동
                    state: { from: props.location }, // 이전 위치 정보 전달
                }}
            />
        );
    } 

    // [토큰이 없을 경우] 로그인 페이지로 리다이렉션
    else {
        return (
            <Navigate
                to={{
                    pathname: "/login",              // 로그인 페이지로 이동
                    state: { from: props.location }, // 이전 위치 정보 전달
                }}
            />
        );
    }
}

export default SocialLogin;