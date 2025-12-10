// [회원가입 컴포넌트]
// React 및 필요한 컴포넌트, API 함수, 라우팅 컴포넌트

import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { signup } from "./service/ApiService";
import { Link } from "react-router-dom";

// [회원가입 컴포넌트]
function SignUp() {
    // 폼 제출 핸들러
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target); // 폼 데이터 객체 
        const username  = data.get("username");  // 사용자명
        const password = data.get("password");   // 패스워드

        // signup API 호출 후 로그인 페이지로 이동
        signup({ username: username, password: password }).then((response) => {
            window.location.href = "/login"; // 회원가입 성공 후 로그인 페이지로 리다이렉트
        });
    };

    return (
        // 회원가입 UI를 감싸는 MUI 컨테이너
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%"}}>
            {/* form 요소 (submit 시, handleSubmit 함수 실행) */}
            <form noValidate onSubmit={handleSubmit}>
                {/* Grid를 사용해 항목 레이아웃 구성 */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* 제목 표시 */}
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {/* 사용자명 입력 필드 */}
                        <TextField
                            autoComplete="fname" // 자동 완성 힌트                            
                            variant="outlined"   // 외곽선 스타일
                            required             // 필수 입력
                            fullWidth            // 전체 너비 사용
                            name="username"      // 폼 데이터 키
                            id="username"        
                            label="아이디"        // 라벨 텍스트
                            autoFocus            // 페이지 진입 시 자동 포커싱
                        />    
                    </Grid>
                    <Grid item xs={12}>
                        {/* 비밀번호 입력 필드 */}
                        <TextField
                            variant="outlined"   // 외곽선 스타일
                            required             // 필수 입력
                            fullWidth            // 전체 너비 사용
                            name="password"      // 폼 데이터 키
                            label="패스워드"      // 라벨 텍스트
                            type="password"      // 입력값 숨김 처리
                            id="password"        
                            autoComplete="current-password" 
                        /> 
                    </Grid>
                    <Grid item xs={12}>
                        {/* 회원가입 버튼 */}
                        {/* submit : handleSubmit 메서드 자동 실행 */}
                        <Button type="submit" fullWidth variant="contained" color="primary"> 
                            계정 생성
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {/* 로그인 페이지로 이동 링크 */}
                        <Link to="/login" variant="body2">
                            이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>                     
                </Grid>
            </form>
        </Container>
    );
}

// Signup 컴포넌트 외부에서 사용할 수 있도록 e xport
export default SignUp;

