import React, { ReactNode, useState } from 'react';
import * as Styled from './CreateProject.styled';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import SideBar from '../MainView/SideBar/SideBar';
import { CSSProperties } from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ProjectData {
  title: string;
  subtitle: string;
  author: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  participants: string;
}

const CreateProject: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [participants, setParticipants] = useState<string>('');

  const navigate = useNavigate();

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/projects', {
        title,
        subtitle,
        author,
        description,
        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : null,
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : null,
        participants,
      });
      console.log('성공:', response.data);
    } catch (error) {
      console.error('실패:', error);
    }
  };

  return (
    <Styled.Container>
      <SideBar />
      <Styled.ContentContainer>
        <Styled.BackBtn
          onClick={() => {
            navigate('/main');
          }}>
          <MdOutlineArrowBackIosNew />
          <Styled.BackBtnText>Back</Styled.BackBtnText>
        </Styled.BackBtn>
        <Styled.Content>
          <Styled.ContentBox>
            <Flex gap={30} alignItems="unset">
              <Flex gap={20} alignItems="unset">
                <Styled.Input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Styled.Input
                  type="text"
                  placeholder="부제목을 입력하세요"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />

                <Styled.Input
                  type="text"
                  placeholder="작성자를 입력하세요"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <Styled.TextArea
                  rows={12}
                  placeholder="프로젝트 내용"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Flex>

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

              <Styled.Input
                type="text"
                placeholder="참가자를 입력하세요"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
            </Flex>

            <Styled.BtnBox>
              <Styled.GreenBtn1 onClick={handleSubmit}>등록하기</Styled.GreenBtn1>
              <Styled.GreenBtn2
                onClick={() => {
                  navigate('/main');
                }}>
                취소하기
              </Styled.GreenBtn2>
            </Styled.BtnBox>
          </Styled.ContentBox>
        </Styled.Content>
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export default CreateProject;

const Flex = ({
  children,
  gap,
  flexDirection = 'column',
  justifyContent = 'center',
  alignItems = 'center',
}: {
  children: ReactNode;
  gap?: number;
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  style?: CSSProperties;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        gap,
      }}>
      {children}
    </div>
  );
};
