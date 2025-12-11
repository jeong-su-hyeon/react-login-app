import './App.css';
import Todo from './Todo';
import React, {useState, useEffect} from "react";
import {
  Container,
  List,
  Paper,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import AddTodo from "./AddTodo";
import {call, signout} from "./service/ApiService";

// 앱의 핵심 역할
// 할일 목록 CRUD, 로그아웃
function App() {
  // [상태 정의]
  const [items, setItems] = useState([]);  // 할 일 목록 상태 (items: 현재 할일 목록 저장 배열)
  const [loading, setLoading] = useState(true); // 로딩 상태 (loading: 기본 true, 데이터를 불러오는 중인지 아닌지 표시)

  // [조회] 초기 데이터
  // 컴포넌트 마운트 시 할 일 목록 불러오기
  useEffect(() => {
    call("/todo", "GET", null)  // GET 요청으로 할 일 목록 요청
      .then((response) => {
        setItems(response.data);  // 데이터를 성공적으로 받아오면 items에 저장
      })
      .catch((error) => {
        console.error("Error fetching todo items: ", error); // 에러 로깅
      })
      .finally(() => {
        setLoading(false); // 로딩 완료
      });
  }, []);

  // [추가] 새로운 할일 추가
  const addItem = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data)); // 서버에 POST 후 목록 업데이트
  };

  // [수정] 항목 수정
  const editItem = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data)); // 서버에 PUT 후 목록 업데이트
  };

  // [삭제] 항목 삭제
   const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data)); // 서버에 DELETE 후 목록 업데이트
  };

  // [렌더링] 할일 목록 렌더링
  // 할일 항목이 하나라도 있다면 Todo 컴포넌트 반복 렌더링
  let todoItems = items.length > 0 && (
    <Paper style={{margin:16}}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}             // Todo 항목 전달 
            key={item.id}           // 고유키
            editItem={editItem}     // 수정 함수 전달 
            deleteItem={deleteItem} // 삭제 함수 전달
          />
        ))}
      </List>
    </Paper>
  );

  // [상단 네비게이션 바] 
  let navigationBar = (
    <AppBar position='static'>
      <Toolbar>
        <Grid justifyContent='space-between' container> 
          <Grid item>
            <Typography variant="h6">오늘의 할 일</Typography> {/* 앱 타이틀 */}
          </Grid>
          <Grid item>
            <Button color='inherit' variant="contained" onClick={signout}>  {/* 버튼 클릭 시 signout 메서드 실행  -> 저장된 토큰 삭제 */}
              {/* 로그아웃 버튼 */}
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  // [메인 화면]
  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem}/> {/* 앱 타이틀 */}
        <div className='TodoList'>{todoItems}</div> {/* 할일 목록 출력 */}
      </Container>
    </div>
  );

  // [로딩 화면]
  let loadingPage = <h1> 로딩 중 ...</h1>; 
  let content = loadingPage; // 기본 화면 = 로딩 페이지

  if (!loading) {
    content = todoListPage; // 로딩이 끝나면 Todo 페이지
  }

  // 전체 앱 콘텐츠 반환
  return <div className='App'>{content}</div>
}

export default App;
