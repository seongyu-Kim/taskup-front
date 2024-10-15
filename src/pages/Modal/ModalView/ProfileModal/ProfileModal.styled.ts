import styled from 'styled-components';
import { IoIosReverseCamera } from 'react-icons/io';

//모달 배경
export const ProfileModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 16;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .closeIcon {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 15px;
    right: 15px;
    color: rgba(199, 199, 199, 0.69);
    cursor: pointer;
  }
`;
//모달 박스
export const ProfileModalBox = styled.div`
  width: 300px;
  height: 300px;
  background: #d9d9d9;
  border-radius: 10px;
  z-index: 16;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
// 모달 헤더 - 프로필, 완료 버튼
export const ProfileModalHeaderBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  position: relative;
`;
// 로그아웃 버튼
export const ProfileLogOutButton = styled.button`
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 30px;
  background: #eb2222;
  color: white;
  cursor: pointer;
`;
//완료 버튼
export const ProfileCompleteButton = styled(ProfileLogOutButton)`
  position: absolute;
  right: 10px;
  border: none;
  border-radius: 8px;
  width: 50px;
  background: #9aaa30;
  color: white;
`;
//이름 영역
export const ProfileNameText = styled.p`
  margin: 0;
`;
//모달창 바디
export const ProfileModalBodyBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  .camera {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 25px;
    top: 125px;
    z-index: 18;
  }
`;
//모달창 메인 영역
export const ProfileModalMainBox = styled(ProfileModalBodyBox)`
  gap: 10px;
  width: 100%;
  margin-top: 15px;
`;
// 프로필 이미지 박스
export const ProfileModalImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;

  &:hover .icons {
    display: block; // hover 시에 아이콘을 표시
  }
`;
// 프로필 이미지
export const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid gray;
  cursor: pointer;
  object-fit: cover;
  z-index: 17;
  background: #222127;
  &:hover {
    opacity: 15%;
  }
`;
//이미지 변경 카메라 아이콘
export const ProfileImgChangeCameraIcon = styled(IoIosReverseCamera)`
  display: none;
  width: 130px;
  height: 130px;
  color: white;
  position: absolute;
  z-index: 16;
`;
