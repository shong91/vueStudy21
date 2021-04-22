// 스토어 내의 변이 이름은 따로 관리하는 것이 스토어의 역할 파악에 용이

export const FETCH_MEMOS = 'FETCH_MEMOS'; 
export const ADD_MEMO = 'ADD_MEMO';
export const DELETE_MEMO = 'DELETE_MEMO'; 
export const UPDATE_MEMO = 'UPDATE_MEMO'; 

// 메모 데이터가 많아질수록 어떤 데이터가 수정 중인치 바로 예측하기 어렵다. 
// 예측 가능한 애플리케이션을 만들기 위해, 수정중인 데이터를 확인할 수 있도록 상태값 및 변이 타입을 추가로 선언한다. 
export const SET_EDITING_ID = 'SET_EDITING_ID'; 
export const RESET_EDITING_ID = 'RESET_EDITING_ID';
