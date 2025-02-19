# TaskUp
<div align="center">
  <img width="45%" alt="스크린샷 2025-02-19 오후 5 27 29" src="https://github.com/user-attachments/assets/2001235a-ea94-43b0-9aac-b37b4b7e9ecf" />
</div>

<br />

## 1. 팀 소개
**팀명** : 3팀

**팀원** : 김선규(팀장), 박주호, 김하영, 백기준

<br />

## 2. 기획내용
**프로젝트 주제** : 업무 지원 플랫폼

**프로젝트 기간** : 2024년 10월 04일 ~ 2024년 10월 21일

**프로젝트 인원** : 4명

**프로젝트 소개** : 프로젝트를 간단하게 생성하고, 조회 및 관리할 수 있는 플랫폼

<br/>

**기술 스택** :  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"> 	![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) <img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=white" /> 

<br />

## 3. 역할 분담
| **팀원**            | **역할**                                                                 |
|---------------------|--------------------------------------------------------------------------|
| **김선규 (Front)**  | 프로젝트 생성, 프로젝트 상세보기                                                |
| **박주호 (Front)**  | 메인페이지, 사이드바                                            |
| **김하영 (Front)**  | 로그인 & 회원가입, 비밀번호 찾기, 비밀번호 재설정                                      |
| **백기준 (Back)**   | 로그인 & 회원가입 API, 프로젝트 API, 알림 API                     |

<br />

## 4. 구현기능
##### 로그인 및 회원가입
- 로그인 : 사용자의 입력 값을 유효성 검사 후 토큰 저장
- 회원가입 : 이메일로 인증코드 발송 후 인증코드와 입력 값 유효성 검사 후 회원가입
- 비밀번호 재설정 : 이메일 유효성 검사 및 인증 후 이메일로 재설정 링크 전송

##### 메인페이지 
- 사이드바 : 새 프로젝트 생성, 알림 확인, 프로필 수정, 로그아웃 버튼
- 프로젝트 리스트: 현재 참여중인 프로젝트를 조회하고 클릭해 상세페이지로 이동, 체크 버튼을 통해 완료 여부 표시
- 캘린더: 현재 참여중인 프로젝트의 일정을 캘린더에서 확인 가능
- 프로필 수정: 프로필 사진 변경 가능
- 알림창: 프로젝트 종료일이 일주일 이내일 경우 알림 발송


##### 프로젝트 생성
- 프로젝트를 생성하거나 수정할 수 있는 페이지
- 프로젝트 생성/수정 페이지를 분리하는 대신, 데이터의 유무의 따라 요청을 다르게 하여 하나의 페이지에서 생성과 수정 가능

##### 프로젝트 상세보기
- 프로젝트의 세부 정보를 보여주는 페이지
- 수정하기 버튼을 누를 경우 데이터를 전달받아 생성 폼에서 기존 정보가 채워진 상태로 수정 가능

<br />

## 5. 보완할 점 & 추후 개발하고자 하는부분
- 프로젝트 정보와 같이 다양한 상태값이 필요할 땐 하나의 상태로 축약할 수 있으나 축약하지 않고 너무 많은 상태값을 사용했음
- 디자인이나 사용자 경험에 대한 부분이 많이 아쉬움
- 업무 지원 플랫폼이란 주제에 맞게 개발을 했지만 업무 지원에 초점이 맞춰지기 보다는 단순한 CRUD에 초점이 맞춰진 것 같아서 기획 부분에서 아쉬움이 남음. 기획의 중요성을 확실히 느낌

<br />

## 시연영상
https://www.youtube.com/watch?v=MQrHQkgr8G8&list=PLhBsbIXDcDgdM62hExqcubGo2vD4I8uV2
