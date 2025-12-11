// [로그인 컴포넌트]
// React 및 필요한 컴포넌트, API 함수, 라우팅 컴포넌트
import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { signup, socialLogin } from "./service/ApiService";

function Login() {
    // 일반 로그인 시, 실행되는 메서드
    const handleSubmit = (event) => {
        event.preventDefault(); // 폼 기본 제출 동작 방지

        const data = new FormData(event.target); // 폼 데이터 객체 
        const username  = data.get("username");  // 사용자명
        const password = data.get("password");   // 패스워드

        // 로그인 API 호출
        signup({ username: username, password: password });
    };

    // 소셜 로그인 시, 실행되는 함수
    const handleSocialLogin = (provider) => {
        socialLogin(provider); // 전달된 provider(Google, Kakao 등)로 소셜 로그인 실행
    };

    return (
        // 로그인 UI를 감싸는 MUI 컨테이너
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%"}}>
            {/* 상단 제목*/}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>    
                </Grid>
            </Grid>

            {/* 로그인 폼 */} 
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* [일반 로그인] */}
                    <Grid item xs={12}>
                        {/* 사용자명 입력 필드 */} 
                        <TextField                           
                            variant="outlined"      // 외곽선 스타일
                            required                // 필수 입력
                            fullWidth               // 전체 너비 사용                          
                            id="username"        
                            label="아이디"           // 라벨 텍스트
                            name="username"         // 폼 데이터 키
                            autoComplete="username" // 자동 완성 힌트 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* 비밀번호 입력 필드 */} 
                        <TextField                           
                            variant="outlined"      // 외곽선 스타일
                            required                // 필수 입력
                            fullWidth               // 전체 너비 사용 
                            name="password"         // 폼 데이터 키 
                            label="패스워드"         // 라벨 텍스트  
                            type="password"         // 입력값 마스킹 처리                      
                            id="password"       
                            autoComplete="current-password" // 자동 완성 힌트 
                        />
                    </Grid>

                    <Grid item xs={12}>
                        {/* 일반 로그인 버튼 */}
                        {/* submit : handleSubmit 메서드 자동 실행 */}
                        <Button type="submit" fullWidth variant="contained" color="primary"> 
                            로그인
                        </Button>
                    </Grid>

                    {/* [소셜 로그인] */}
                    <Grid item xs={12}>
                        {/* Google 로그인 버튼 */}
                        <Button
                            onClick={() => handleSocialLogin("google")}
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: "#000 "}} // 검정 배경
                        >
                            구글로 로그인하기
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        {/* Naver 로그인 버튼 */}
                        <Button
                            onClick={() => handleSocialLogin("naver")}
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: "#000 "}} // 검정 배경
                        >
                            네이버로 로그인하기
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        {/* Kakao 로그인 버튼 */}
                        <Button
                            onClick={() => handleSocialLogin("kakao")}
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: "#000 "}} // 검정 배경
                        >
                            카카오로 로그인하기
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        {/* Github 로그인 버튼 */}
                        <Button
                            onClick={() => handleSocialLogin("github")}
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: "#000 "}} // 검정 배경
                        >
                            깃허브로 로그인하기
                        </Button>
                    </Grid>

                    <Grid item >
                        {/* 회원가입 이동 링크 */}
                        <Link to="/signup" variant="body2">
                            계정이 없습니까? 여기서 가입하세요.
                        </Link>
                    </Grid>
                </Grid>
                
            </form>
        </Container>
    );
}

// Signup 컴포넌트 외부에서 사용할 수 있도록 e xport
export default SignUp;

