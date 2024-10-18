import * as Styled from './NoticeModal.styled';
import { useModal } from '@stores/ModalStore/ModalStore';
import { RiCloseLargeFill } from 'react-icons/ri';
import { handleModalCloseClick } from '@utils/HandleModalCloseClick';
import MainPageDefaultButton from '@components/MainPageDefaultButton/MainPageDefaultButton';
import { useUserStore } from '@stores/UserStore/userStore';
import { useNoticeMessage } from '@stores/UserMessageStore/UserMessagestore';
import { useNavigate } from 'react-router-dom';

interface NoticeDataType {
  taskId: number;
  userId: string;
  message: string;
}

export default function NoticeModal() {
  const { isOpen, setIsOpen } = useModal();
  const { user } = useUserStore();
  const { messages } = useNoticeMessage();
  if (!user) {
    return null;
  }
  //사용자 필터링
  const userNoticeData: NoticeDataType[] = messages.filter((item) =>
    item.message.includes(user.name),
  );
  if (!isOpen) {
    return null;
  }
  console.log('userNoticeData', userNoticeData);
  return (
    <>
      <Styled.NoticeModalContainer onClick={() => setIsOpen(false)}>
        <RiCloseLargeFill className="closeIcon" />
        <Styled.NoticeModalBox onClick={handleModalCloseClick}>
          <Styled.NoticeModalHeaderBox>
            <p>알림</p>
          </Styled.NoticeModalHeaderBox>
          <Styled.NoticeModalBodyBox>
            <NoticeList data={userNoticeData} />
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

const NoticeList = ({ data }: { data: NoticeDataType[] }) => {
  const navigate = useNavigate();
  const { setIsOpen } = useModal();
  const handleViewTaskClick = (id: number) => {
    navigate(`/view/${id.toString()}`);
    setIsOpen(false);
  };
  console.log('userNoticeData', data);
  return (
    <ul>
      {data
        .map(({ taskId, userId, message }) => {
          const [, alertInfo, taskInfo, endDate] = message.split(': ');
          const remainingDays = alertInfo.split(' ')[0];
          const taskTitle = taskInfo.split("'")[1];

          return { taskId, userId, taskTitle, remainingDays, endDate };
        })
        .sort((a, b) => {
          const daysA = a.remainingDays.includes('하루') ? 1 : parseInt(a.remainingDays);
          const daysB = b.remainingDays.includes('하루') ? 1 : parseInt(b.remainingDays);
          return daysA - daysB;
        })
        .map(({ taskId, userId, taskTitle, remainingDays, endDate }) => {
          const textColor = remainingDays.includes('3일')
            ? 'orange'
            : remainingDays.includes('하루')
              ? 'red'
              : 'black';
          return (
            <li key={userId}>
              <Styled.NoticeText
                onClick={() => {
                  handleViewTaskClick(taskId);
                }}
                color="black">
                제목: {taskTitle}
              </Styled.NoticeText>
              <Styled.NoticeText
                onClick={() => {
                  handleViewTaskClick(taskId);
                }}
                color={textColor}>
                {remainingDays} 남았습니다
              </Styled.NoticeText>
              <Styled.NoticeText
                onClick={() => {
                  handleViewTaskClick(taskId);
                }}
                color="black">
                종료일: {endDate}
              </Styled.NoticeText>
            </li>
          );
        })}
    </ul>
  );
};
