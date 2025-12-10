import React from "react";                     // React 라이브러리 임포트
import './index.css';                          // 전역 스타일 시트 임포트
import { createRoot } from 'react-dom/client'; // React 18의 createRoot API 임포트 (ReactDOM 대신)
import AppRouter from './AppRouter';           // 라우팅을 담당하는 AppRouter 컴포넌트 임포트

// 앱의 루트 컴포넌트(AppRouter)를 통해 HTML 파일 안에 있는 특정 DOM 요소에 연결한 뒤, 앱 전체를 초기화하고 렌더링 

// [진입점]
// 1 [React 앱이 시작될 위치] root 엘리먼트를 DOM에서 선택 (React 앱이 마운트될 위치)
const container = document.getElementById("root");

// 2 [createRoot를 통해 root 객체 생성]
// React 앱의 root 인스턴스 생성
const root = createRoot(container);

// AppRouter 컴포넌트를 root에 렌더링
root.render(<AppRouter tab="home" />);