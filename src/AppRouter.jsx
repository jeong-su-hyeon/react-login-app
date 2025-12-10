import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import SocialLogin from "./SocialLogin";
import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react_router_dom";
import { Typography, Box } from "@mui/material";

// [라우팅 컴포넌트]
// 페이지 전환 담당
// 사용자가 어떤 경로에 있느냐에 따라, 어떤 컴포넌트를 화면에 보여줄지 결정
// => 앱의 각 경로에 어떤 컴포넌트를 연결할지 설정하는 역할
function AppRouter() {
    return (
        <div>
            {/* 라우터로 앱의 페이지 라우팅 처리 */}
            <BrowserRouter> {/* 브라우저의 URL을 기반으로 라우팅을 지원 (앱 전체를 감싸는 역할) */}
                <Routes> {/* 여러 개의 Route를 묶어주는 역할 */}
                    {/* 루트 경로에 App 컴포넌트 렌더링 */}                     
                    <Route path="/" element={<App />} />

                    {/* /login 경로에 Login 컴포넌트 렌더링 */}                     
                    <Route path="/login" element={<Login />} />
                    {/* /signup 경로에 SignUp 컴포넌트 렌더링 */}                     
                    <Route path="/signup" element={<SignUp />} />
                    {/* /sociallogin 경로에 SocialLogin 컴포넌트 렌더링 */}                     
                    <Route path="/sociallogin" element={<SocialLogin />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default AppRouter;