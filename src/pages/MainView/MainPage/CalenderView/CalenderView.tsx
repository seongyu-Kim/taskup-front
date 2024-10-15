import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalenderBox } from './CalenderView.styled';
import { handleDayCellContent } from '@utils/CalenderUtils';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface CalenderType {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

export default function CalenderView() {
  const [callEvent, setCallEvent] = useState<CalenderType[]>([]);
  useEffect(() => {
    const callCalenderEventData = async () => {
      try {
        //추후 링크 수정
        const response = await axios.get('http://localhost:8080/tasks/calender');
        if (response) {
          setCallEvent(response.data.data);
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    };
    callCalenderEventData().catch(console.error);
  }, []);

  return (
    <CalenderBox>
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={callEvent.map((item) => ({
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
