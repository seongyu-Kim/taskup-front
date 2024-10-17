import {
  NoticeModalBox,
  NoticeModalContainer,
  NoticeModalBodyBox,
  NoticeModalHeaderBox,
  NoticeModalCloseButton,
} from './NoticeModal.styled';
import { useModal } from '../../../../stores/ModalStore/ModalStore';
import { RiCloseLargeFill } from 'react-icons/ri';
import { handleModalCloseClick } from '../../../../utils/HandleModalCloseClick';

export default function NoticeModal() {
  const { isOpen, setIsOpen } = useModal();
  return isOpen ? (
    <>
      <NoticeModalContainer onClick={() => setIsOpen(false)}>
        <RiCloseLargeFill className="closeIcon" />
        <NoticeModalBox onClick={handleModalCloseClick}>
          <NoticeModalHeaderBox>
            <p>알림</p>
          </NoticeModalHeaderBox>
          <NoticeModalBodyBox>
            <ul>
              <li>
                <p>프로젝트명: {1}</p>
                <p>마감일이 {1}일 남았습니다</p>
              </li>
              <li>
                <p>프로젝트명: {2}</p>
                <p>마감일이 {3}일 남았습니다</p>
              </li>
              <li>
                <p>프로젝트명: {3}</p>
                <p>마감일이 {4}일 남았습니다</p>
              </li>
              <li>
                <p>프로젝트명: {4}</p>
                <p>마감일이 {5}일 남았습니다</p>
              </li>
              <li>
                <p>프로젝트명: {6}</p>
                <p>마감일이 {7}일 남았습니다</p>
              </li>
              <li>
                <p>프로젝트명: {7}</p>
                <p>마감일이 {8}일 남았습니다</p>
              </li>
            </ul>
          </NoticeModalBodyBox>
          <NoticeModalCloseButton
            onClick={() => {
              setIsOpen(false);
            }}>
            닫기
          </NoticeModalCloseButton>
        </NoticeModalBox>
      </NoticeModalContainer>
    </>
  ) : null;
}
