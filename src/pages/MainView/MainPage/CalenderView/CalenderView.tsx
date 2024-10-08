import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalenderBox } from './CalenderView.styled';
import { handledayCellContent } from '../../../../utils/CalenderUtils';

export default function CalenderView() {
  return (
    <CalenderBox>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView={'dayGridMonth'}
        height={'500px'}
        editable={true}
        locale={'ko'}
        dayCellContent={handledayCellContent}
      />
    </CalenderBox>
  );
}
