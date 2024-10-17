import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalenderBox } from './CalenderView.styled';
import { handleDayCellContent } from '@utils/CalenderUtils';
import { useEffect, useState } from 'react';
import apiMainPage from '@apis/apiMainPage';
import { useUserStore } from '@stores/UserStore/userStore';

interface CalenderType {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

//임시
interface CalenderType {
  id: number;
  title: string;
  status?: number;
  startDate: string;
  endDate: string;
  members: string[];
  author?: string;
}

export default function CalenderView() {
  const [callEvent, setCallEvent] = useState<CalenderType[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    const callCalenderEventData = async () => {
      try {
        //임시
        const response = await apiMainPage.get('tasks?page=1&pageSize=10&status');
        if (response) {
          setCallEvent(response.data.data.data);
        }
      } catch (error) {
        console.log('CALENDERVIEW DATA CALL ERROR', error);
      }
    };
    callCalenderEventData().catch(console.error);
  }, []);

  if (!user) {
    return null;
  }

  // const userEventData = callEvent.filter((item) => item.members.includes(user.name));
  const userEventData = callEvent.filter(
    (item) => item.author!.includes(user.name) || item.members.includes(user.name),
  );

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
