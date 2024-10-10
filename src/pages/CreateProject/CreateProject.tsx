import React, { useState } from 'react';
import * as Styled from './CreateProject.styled';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';

const CreateProject: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <Styled.Container>
      <Styled.ContentContainer>
        <Styled.BackBtn>
          <MdOutlineArrowBackIosNew />
          <Styled.BackBtnText>Back</Styled.BackBtnText>
        </Styled.BackBtn>
        <Styled.Content>
          <Styled.ContentBox>
            <Styled.Input type="text" placeholder="제목을 입력하세요" />

            <Styled.MarginTop top={20} />

            <Styled.Input type="text" placeholder="부제목을 입력하세요" />

            <Styled.MarginTop top={20} />

            <Styled.Input type="text" placeholder="작성자를 입력하세요" />

            <Styled.MarginTop top={20} />

            <Styled.TextArea rows={12} placeholder="프로젝트 내용" />

            <Styled.MarginTop top={30} />

            <Styled.DateBox>
              <Styled.DateText>시작일</Styled.DateText>
              <Styled.DateInput>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="yy-MM-dd"
                  customInput={
                    <Styled.CalendarButton>
                      <FaCalendarAlt />
                    </Styled.CalendarButton>
                  }
                />
                <Styled.DateDisplay>
                  {startDate ? format(startDate, 'yy-MM-dd') : 'yy-mm-dd'}
                </Styled.DateDisplay>
              </Styled.DateInput>

              <Styled.MarginLeft left={30} />

              <Styled.DateText>종료일</Styled.DateText>
              <Styled.DateInput>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="yy-MM-dd"
                  customInput={
                    <Styled.CalendarButton>
                      <FaCalendarAlt />
                    </Styled.CalendarButton>
                  }
                />
                <Styled.DateDisplay>
                  {endDate ? format(endDate, 'yy-MM-dd') : 'yy-mm-dd'}
                </Styled.DateDisplay>
              </Styled.DateInput>
            </Styled.DateBox>

            <Styled.MarginTop top={30} />

            <Styled.Input type="text" placeholder="참가자를 입력하세요" />

            <Styled.MarginTop top={30} />

            <Styled.BtnBox>
              <Styled.GreenBtn1>등록하기</Styled.GreenBtn1>
              <Styled.GreenBtn2>취소하기</Styled.GreenBtn2>
            </Styled.BtnBox>
          </Styled.ContentBox>
        </Styled.Content>
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export default CreateProject;
