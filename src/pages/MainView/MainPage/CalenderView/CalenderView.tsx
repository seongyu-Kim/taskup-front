import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalenderBox } from './CalenderView.styled';
import { handleDayCellContent } from '@utils/CalenderUtils';
import { useEffect, useState } from 'react';
import apiMainPage from '@api/apiMainPage';
import { useUserStore } from '@stores/UserStore/userStore';

interface CalenderType {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

//임시
interface Task {
  id: number;
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

export default function CalenderView() {
  // const [callEvent, setCallEvent] = useState<CalenderType[]>([]);
  //임시
  const [callEvent, setCallEvent] = useState<Task[]>([]);
  const { user } = useUserStore();
  // useEffect(() => {
  //   const callCalenderEventData = async () => {
  //     try {
  //       //추후 링크 수정
  //       const response = await axios.get('/tasks/calender');
  //       if (response) {
  //         setCallEvent(response.data.data);
  //       }
  //     } catch (error) {
  //       console.log('ERROR', error);
  //     }
  //   };
  //   callCalenderEventData().catch(console.error);
  // }, []);

  //임시 전체 데이터 가져오기
  useEffect(() => {
    const callCalenderEventData = async () => {
      try {
        //임시
        const response = await apiMainPage.get('tasks?page=1&pageSize=10&status');
        if (response) {
          console.log('캘린더 컴포넌트', response.data.message);
          setCallEvent(response.data.data.data);
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    };
    callCalenderEventData().catch(console.error);
  }, []);

  if (!user) {
    return null;
  }

  const userEventData = callEvent.filter((item) => item.members.includes(user.name));

  return (
    <CalenderBox>
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={userEventData.map((item) => ({
          title: item.title,
          start: item.startDate,
          end: item.endDate,
        }))}
        initialView="dayGridMonth"
        height="500px"
        editable={true}
        locale="ko"
        dayCellContent={handleDayCellContent}
      />
    </CalenderBox>
  );
}
