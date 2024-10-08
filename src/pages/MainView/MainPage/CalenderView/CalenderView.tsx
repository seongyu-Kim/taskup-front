import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalenderBox } from './CalenderView.styled';

export default function CalenderView() {
  return (
    <CalenderBox>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView={'dayGridMonth'}
        height={'500px'}
        editable={true}
      />
    </CalenderBox>
  );
}
