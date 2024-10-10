import React, { useState } from 'react';
import * as Styled from './ViewProject.styled';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';

const ViewProject: React.FC = () => {
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
            {/* 상세뷰 */}
            <Styled.ContentFlex>
              <Styled.ContentTitle>제목</Styled.ContentTitle>
              <Styled.ContentDescription>제목입니다.</Styled.ContentDescription>
            </Styled.ContentFlex>

            <Styled.Hr />

            <Styled.ContentFlex>
              <Styled.ContentTitle>부제목</Styled.ContentTitle>
              <Styled.ContentDescription>부제목입니다.</Styled.ContentDescription>
            </Styled.ContentFlex>

            <Styled.Hr />

            <Styled.ContentFlex>
              <Styled.ContentTitle>작성자</Styled.ContentTitle>
              <Styled.ContentDescription>김선규</Styled.ContentDescription>
            </Styled.ContentFlex>

            <Styled.Hr />

            <Styled.ContentFlex>
              <Styled.ContentTitle>내용</Styled.ContentTitle>
              <Styled.ContentDescription style={{ height: '10rem' }}>
                내용입니다.
                <br />
                내용입니다.내용입니다.니다.내용입니다.내용입니다.
                <br />
                내용입니다.내용입니다 .내용입니다.내용입니다.내용입니다.
                <br />
                내용입니다.내용입니다.
              </Styled.ContentDescription>
            </Styled.ContentFlex>

            <Styled.Hr />

            <Styled.ContentFlex>
              <Styled.ContentTitle>시작일</Styled.ContentTitle>
              <Styled.ContentDate>24-11-02</Styled.ContentDate>

              <Styled.MarginLeft left={70} />

              <Styled.ContentTitle>종료일</Styled.ContentTitle>
              <Styled.ContentDate>24-11-02</Styled.ContentDate>
            </Styled.ContentFlex>

            <Styled.Hr />

            <Styled.ContentFlex>
              <Styled.ContentTitle>참가자</Styled.ContentTitle>
              <Styled.ContentDescription>김선규, 박주호, 김하영, 백기준</Styled.ContentDescription>
            </Styled.ContentFlex>

            <Styled.MarginTop top={60} />

            <Styled.BtnBox>
              <Styled.GreenBtn1>수정하기</Styled.GreenBtn1>
              <Styled.GreenBtn2>삭제하기</Styled.GreenBtn2>
            </Styled.BtnBox>
          </Styled.ContentBox>
        </Styled.Content>
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export default ViewProject;
