import * as Styled from './NoticeModal.styled';
import { useModal } from '@stores/ModalStore/ModalStore';
import { RiCloseLargeFill } from 'react-icons/ri';
import { handleModalCloseClick } from '@utils/HandleModalCloseClick';
import { useEffect, useState } from 'react';
import axios from '@api/axios';

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
        const response = await axios.get('/tasks/calender');
        if (response) {
          setNoticeData(response.data.data);
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    };
    callNoticeData().catch(console.error);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Styled.NoticeModalContainer onClick={() => setIsOpen(false)}>
        <RiCloseLargeFill className="closeIcon" />
        <Styled.NoticeModalBox onClick={handleModalCloseClick}>
          <Styled.NoticeModalHeaderBox>
            <p>알림</p>
          </Styled.NoticeModalHeaderBox>
          <Styled.NoticeModalBodyBox>
            <ul>
              {noticeData.map((item) => {
                const endDate = new Date(item.endDate);
                const nowDate = Date.now();
                const dDay = Math.ceil((endDate.getTime() - nowDate) / (1000 * 3600 * 24) + 1);
                if (dDay <= 7) {
                  return (
                    <li key={item.id}>
                      <p>프로젝트명: {item.title}</p>
                      <Styled.NoticeText color={dDay <= 3 ? 'red' : 'black'}>
                        마감일이 {dDay}일 남았습니다.
                      </Styled.NoticeText>
                    </li>
                  );
                }
              })}
            </ul>
          </Styled.NoticeModalBodyBox>
          <Styled.NoticeModalCloseButton
            onClick={() => {
              setIsOpen(false);
            }}>
            닫기
          </Styled.NoticeModalCloseButton>
        </Styled.NoticeModalBox>
      </Styled.NoticeModalContainer>
    </>
  );
}
