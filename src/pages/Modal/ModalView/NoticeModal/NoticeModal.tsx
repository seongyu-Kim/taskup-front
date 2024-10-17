import * as Styled from './NoticeModal.styled';
import { useModal } from '@stores/ModalStore/ModalStore';
import { RiCloseLargeFill } from 'react-icons/ri';
import { handleModalCloseClick } from '@utils/HandleModalCloseClick';
import { useEffect, useState } from 'react';
import apiMainPage from '@api/apiMainPage';
import MainPageDefaultButton from '@components/MainPageDefaultButton/MainPageDefaultButton';
import { useUserStore } from '@stores/UserStore/userStore';

interface NoticeDataType {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}
//임시
interface Task {
  id: number;
  author?: string;
  title: string;
  sub_title: string;
  content: string;
  status: number;
  members: string[];
  startDate: string;
  endDate: string;
  user: {
    name: string;
  };
}

export default function NoticeModal() {
  const { isOpen, setIsOpen } = useModal();
  // const [noticeData, setNoticeData] = useState<NoticeDataType[]>([]);
  //임시
  const [noticeData, setNoticeData] = useState<Task[]>([]);
  const { user } = useUserStore();

  // useEffect(() => {
  //   const callNoticeData = async () => {
  //     try {
  //       //추후 주소 변경
  //       const response = await axios.get('/tasks/calender');
  //       if (response) {
  //         setNoticeData(response.data.data);
  //       }
  //     } catch (error) {
  //       console.log('ERROR', error);
  //     }
  //   };
  //   callNoticeData().catch(console.error);
  // }, []);

  useEffect(() => {
    const callNoticeData = async () => {
      try {
        //임시
        const response = await apiMainPage.get('/tasks?page=1&pageSize=10&status');
        if (response) {
          console.log('알림 컴포넌트', response.data);
          setNoticeData(response.data.data.data);
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
  const userNoticeData = noticeData.filter(
    (item) => item.author!.includes(user.name) || item.members.includes(user.name),
  );

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
                  dDay: Math.ceil(
                    (new Date(item.endDate).getTime() - Date.now()) / (1000 * 3600 * 24) + 1,
                  ),
                }))
                .sort((a, b) => a.dDay - b.dDay)
                .map((item) => {
                  if (item.dDay <= 7) {
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
