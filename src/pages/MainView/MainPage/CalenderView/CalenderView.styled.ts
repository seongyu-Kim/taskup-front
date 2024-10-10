import styled from 'styled-components';

export const CalenderBox = styled.div`
  width: 70%;

  z-index: 1;
  // toolbar container
  .fc .fc-toolbar.fc-header-toolbar {
    margin: 0;
    padding: 0 40px;
    background-color: #647ea1;
    height: 50px;
    font-weight: 600;
    font-size: 12px;
    line-height: 29px;
    color: white;
    border-radius: 10px 10px 0 0;
  }

  // toolbar 버튼
  .fc .fc-button-primary {
    background-color: transparent;
    border: none;

    span {
      font-weight: 500;
      font-size: 28px;
    }

    :hover {
      background-color: transparent;
    }
  }
  // 요일 부분
  .fc-theme-standard th {
    height: 32px;
    padding-top: 3px;
    background: #e5edff;
    border: 1px solid #dddee0;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #7b7b7b;
  }

  // 오늘 날짜 배경색
  .fc .fc-daygrid-day.fc-day-today {
    background-color: wheat;
    color: #356eff;
  }

  // 날짜별 그리드
  .fc .fc-daygrid-day-frame {
    font-size: 14px;
    background: white;
  }

  // 날짜  ex) 2일
  .fc .fc-daygrid-day-top {
    flex-direction: row;
    margin-bottom: 3px;
  }

  // 각 이벤트 요소
  .fc-event {
    cursor: pointer;
    padding: 5px 8px;
    margin-bottom: 5px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
  }
`;
