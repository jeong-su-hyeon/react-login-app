import React, {useState, useEffect} from "react";
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
    ListItemSecondaryAction,
    IconButton
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined"; // 삭제 아이콘

// [Todo 컴포넌트]
// 사용자의 Todo 추가, 수정, 완료 표시, 삭제 등 제어
// 1) 할 일 텍스트와 완료 상태를 표시
// 2) 사용자가 텍스트를 수정할 수 있도록
// 3) 체크박스와 삭제 버튼을 통해 완료 처리, 삭제
const Todo = (props) => {
    const [item, setItem] = useState(props.item);   // 부모로부터 받은 todo 항목 상태로 초기화 
    const [readOnly, setReadOnly] = useSate(true);  // 텍스트 입력 필드 읽기 전용 여부 상태 (true)

    const deleteItem = props.deleteItem; // 삭제 함수 props에서 전달받음
    const editItem = props.editItem;     // 수정 함수 props에서 전달받음

    // [텍스트 입력 도중] 실행되는 메서드
    const editEventHandler = (e) => {
        // e.target : HTML 요소 (input 요소)
        // e.target.value : 사용자가 입력한 새로운 값
        // ... : 객체나 배열을 새로운 객체나 배열로 복사할 때 사용 (객체 복사 및 병합)
        setItem({ ... item, title: e.target.value }); // title 속성만 변경하여 상태 업데이트
    };

    // [체크박스 클릭 시] 실행되는 메서드
    const checkboxEventHadler = (e) => {
        item.done = e.target.checked;   // 완료 상태 변경
        editItem(item);                 // 수정된 항목을 부모로 전달
    };

    // [삭제 버튼] 클릭 시 실행되는 메서드
    const deleteEventHandler = (e) => {
        deleteItem(item);   // 현재 항목 삭제 요청
    };

    // [텍스트 클릭 시] 읽기 전용 해제
    const turnOffReadOnly = () => {
        setReadOnly(false);
    };

    // [입력 필드에서 엔터 키 누를 경우] 읽기 전용으로 되돌리기, 수정 반영
    const turnOnReadOnly = (e) => {
        if (e.key === "Enter" && readOnly === false) {
            setReadOnly(true); 
            editItem(item); // 수정된 내용 저장
        }
    };

    return (
        // 하나의 Todo 항목 리스트 렌더링
        <ListItem>
            {/* [1] 완료 여부 체크박스 */}
            <Checkbox checked={item.done} onChange={checkboxEventHandler}/>

            {/* [2] 텍스트 입력 필드 (title 표시 및 수정) */}
            <ListItemText>
                <InputBase>
                </InputBase>
            </ListItemText>
        </ListItem>
    );
}