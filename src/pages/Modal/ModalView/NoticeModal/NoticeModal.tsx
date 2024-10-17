import * as Styled from './NoticeModal.styled';
import { useModal } from '@stores/ModalStore/ModalStore';
import { RiCloseLargeFill } from 'react-icons/ri';
import { handleModalCloseClick } from '@utils/HandleModalCloseClick';
import { useEffect, useState } from 'react';
import apiMainPage from '@apis/apiMainPage';
import MainPageDefaultButton from '@components/MainPageDefaultButton/MainPageDefaultButton';
import { useUserStore } from '@stores/UserStore/userStore';

interface NoticeDataType {
  id: number;
  name: string;
  title?: string;
  status?: string;
  startDate: string;
  endDate: string;
}

export default function NoticeModal() {
  const { isOpen, setIsOpen } = useModal();
  const [noticeData, setNoticeData] = useState<NoticeDataType[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    const callNoticeData = async () => {
      try {
        //임시
        const response = await apiMainPage.get('/tasks/calender?startDate=2024-10-01&type=month');
        if (response) {
          setNoticeData(response.data.data);
        }
      } catch (error) {
        console.log('NOTICE DATA CALL ERROR', error);
      }
    };
    callNoticeData().catch(console.error);
  }, []);

  if (!user) {
    return null;
  }
  //사용자 필터링
  const userNoticeData = noticeData.filter((item) => item.name.includes(user.name));

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
              {userNoticeData
                .map((item) => ({
                  ...item,
                  dDay: Math.floor(
                    (new Date(item.endDate).getTime() - Date.now()) / (1000 * 3600 * 24),
                  ),
                }))
                .sort((a, b) => a.dDay - b.dDay)
                .map((item) => {
                  if (item.dDay <= 7 && item.dDay > 0) {
                    return (
                      <li key={item.id}>
                        <p>프로젝트명: {item.title}</p>
                        <Styled.NoticeText color={item.dDay <= 3 ? 'red' : 'black'}>
                          마감일이 {item.dDay}일 남았습니다.
                        </Styled.NoticeText>
                      </li>
                    );
                  }
                  return null;
                })}
            </ul>
          </Styled.NoticeModalBodyBox>
          <MainPageDefaultButton
            onClick={() => {
              setIsOpen(false);
            }}>
            닫기
          </MainPageDefaultButton>
        </Styled.NoticeModalBox>
      </Styled.NoticeModalContainer>
    </>
  );
}
