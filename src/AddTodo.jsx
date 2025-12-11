import React, { useState } from "react";
import { Button, Grid,TextField } from "@mui/material"

// [할일 추가 컴포넌트]
// -> 사용자가 입력한 텍스트를 새로운 할 일로 등록
const AddTodo = (props) => {
    const [item, setItem] = useState({title: "" }); // 입력 필드 상태 관리 (사용자가 입력 중인 할일 데이터)
    const addItem = props.addItem;                  // 부모로부터 전달받은 addItem 함수

    // 버튼 클릭 시 실행
    const onButtonClick = () => {
        addItem(item);       // 입력된 할 일 항목 부모에 전달
        setItem({title: ""}) // 입력 필드 초기화
    }

    // 입력 필드 변경 시 상태 업데이트 실행
    const onInputChange = (e) => {
        setItem({title: e.target.value}); // 입력 값으로 상태 변경
        console.log(item);
        // (-> 비동기 처리되기 때문에 바로 직전 값이 찍힐 수도 있음)
    }

    // 엔터 키 클릭 -> 버튼 클릭 함수 실행
    // (마우스 클릭 없이 엔터키만으로 입력할 때)
    const enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            onButtonClick(); // onButtonClick
        }
    }
    
    return (
        // Grid 레이아웃으로 텍스트 입력 필드와 버튼 배치
        <Grid container style={{marginTop:20}}>
            {/* 텍스트 입력 필드 영역 (11/12 너비 차지 */}
            <Grid xs={11} item style={{paddingRight: 16}}>
                <TextField
                    placeholder="Add Todo here"       // 힌트 텍스트
                    fullWidth                         // 가로 전체 사용
                    onChange={onInputChange}          // 입력 변경 이벤트 핸들러 
                    onKeyPress={enterKeyEventHandler} // 엔터키 입력 핸들러
                    value={item.title}
                />
            </Grid>
        </Grid>
    );
}

export default AddTodo;