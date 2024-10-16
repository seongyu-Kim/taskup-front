import styled from 'styled-components';

export const CalenderBox = styled.div`
  width: 70%;
  max-width: 1134px;
  height: 50%;
  overflow: hidden;

  @media (min-width: 300px) and (max-width: 1500px) {
    margin-top: 100px;
    width: 70%;
    height: 30%;
  }

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
    border-radius: 4px;
    font-weight: 500;
    font-size: 12px;
  }
  @media (max-width: 480px) {
    .fc .fc-toolbar.fc-header-toolbar {
      padding: 0 10px; // 패딩 감소
      font-size: 8px; // 폰트 크기 조정
    }

    .fc .fc-button-primary span {
      font-size: 20px; // 버튼 텍스트 크기 조정
    }

    .fc-theme-standard th {
      font-size: 12px; // 요일 폰트 크기 조정
    }

    .fc-event {
      font-size: 10px; // 이벤트 폰트 크기 조정
      padding: 3px 4px; // 이벤트 패딩 감소
    }
  }
`;
