import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalenderBox } from './CalenderView.styled';
import { handleDayCellContent } from '../../../../utils/CalenderUtils';

const tempData = {
  message: '조회 완료',
  data: {
    total: 6,
    page: 1,
    pageSize: 10,
    data: [
      {
        id: 12,
        title: 'test_title',
        sub_title: 'test_sub_title',
        content: 'test_content',
        status: 2,
        members: ['elice2', 'elice3'],
        startDate: '2024-10-11T00:00:00.000Z',
        endDate: '2024-10-22T00:00:00.000Z',
        user: {
          name: 'elice3',
        },
      },
      {
        id: 13,
        title: 'test_title',
        sub_title: 'test_sub_title',
        content: 'test_content',
        status: 2,
        members: ['elice2', 'elice3'],
        startDate: '2024-10-11T00:00:00.000Z',
        endDate: '2024-10-22T00:00:00.000Z',
        user: {
          name: 'elice3',
        },
      },
      {
        id: 14,
        title: 'test_title',
        sub_title: 'test_sub_title',
        content: 'test_content',
        status: 2,
        members: ['elice2', 'elice3'],
        startDate: '2024-10-11T00:00:00.000Z',
        endDate: '2024-10-22T00:00:00.000Z',
        user: {
          name: 'elice3',
        },
      },
      {
        id: 15,
        title: 'test_title',
        sub_title: 'test_sub_title',
        content: 'test_content',
        status: 2,
        members: ['elice2', 'elice3'],
        startDate: '2024-10-11T00:00:00.000Z',
        endDate: '2024-10-22T00:00:00.000Z',
        user: {
          name: 'elice3',
        },
      },
      {
        id: 16,
        title: 'test_title',
        sub_title: 'test_sub_title',
        content: 'test_content',
        status: 2,
        members: ['elice2', 'elice3'],
        startDate: '2024-10-11T00:00:00.000Z',
        endDate: '2024-10-22T00:00:00.000Z',
        user: {
          name: 'elice3',
        },
      },
      {
        id: 17,
        title: 'test_title',
        sub_title: 'test_sub_title',
        content: 'test_content',
        status: 2,
        members: ['elice2', 'elice3'],
        startDate: '2024-10-11T00:00:00.000Z',
        endDate: '2024-10-22T00:00:00.000Z',
        user: {
          name: 'elice3',
        },
      },
    ],
  },
};

export default function CalenderView() {
  return (
    <CalenderBox>
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={tempData.data.data.map((item) => ({
          title: item.title,
          start: item.startDate,
          end: item.endDate,
        }))}
        initialView={'dayGridMonth'}
        height={'500px'}
        editable={true}
        locale={'ko'}
        dayCellContent={handleDayCellContent}
      />
    </CalenderBox>
  );
}
