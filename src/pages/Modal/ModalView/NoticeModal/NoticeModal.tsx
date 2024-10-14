import {
  NoticeModalBox,
  NoticeModalContainer,
  NoticeModalBodyBox,
  NoticeModalHeaderBox,
  NoticeModalCloseButton,
  NoticeText,
} from './NoticeModal.styled';
import { useModal, useModalState } from '../../../../stores/ModalStore/ModalStore';
import { RiCloseLargeFill } from 'react-icons/ri';
import { handleModalCloseClick } from '../../../../utils/HandleModalCloseClick';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface NoticeDataType {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

export default function NoticeModal() {
  const { isOpen, setIsOpen } = useModal();
  const [noticeData, setNoticeData] = useState<NoticeDataType[]>([]);

  useEffect(() => {
    const callNoticeData = async () => {
      try {
        //추후 주소 변경
        const response = await axios.get('http://localhost:4000/tasks/calender');
        if (response) {
          setNoticeData(response.data.data);
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    };
    callNoticeData().catch(console.error);
  }, []);
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
              {noticeData.map((item) => {
                const endDate = new Date(item.endDate);
                const nowDate = Date.now();
                const dDay = Math.ceil((endDate.getTime() - nowDate) / (1000 * 3600 * 24) + 1);
                if (dDay <= 7) {
                  return (
                    <li key={item.id}>
                      <p>프로젝트명: {item.title}</p>
                      <NoticeText color={dDay <= 3 ? 'red' : 'black'}>
                        마감일이 {dDay}일 남았습니다.
                      </NoticeText>
                    </li>
                  );
                }
              })}
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
