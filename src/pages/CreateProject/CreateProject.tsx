import React, { ReactNode, useEffect, useState } from 'react';
import * as Styled from './CreateProject.styled';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { FaCalendarAlt } from 'react-icons/fa';
import SideBar from '../MainView/SideBar/SideBar';
import { CSSProperties } from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import apiMainPage from '../../apis/apiMainPage';
import axios from 'axios';

interface ProjectData {
  title: string;
  subTitle: string;
  content: string;
  startDate: string;
  endDate: string;
  members: string[];
}

const CreateProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [author, setAuthor] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location.state as ProjectData | undefined;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthor(user.name);
    }
    if (projectData) {
      setTitle(projectData.title);
      setSubTitle(projectData.subTitle);
      setContent(projectData.content);
      setStartDate(new Date(projectData.startDate));
      setEndDate(new Date(projectData.endDate));
      setMembers(projectData.members);
    }
  }, [projectData]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  ///
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !subTitle || !content || !startDate || !endDate || members.length === 0) {
      alert('모든 필드에 값을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('토큰', token);

      if (!token) {
        alert('토큰이 없습니다. 다시 로그인 해주세요.');
        return;
      }

      const requestData = {
        title: title,
        subTitle: subTitle,
        content: content,
        members: members.map((member) => member.trim()).filter((member) => member !== ''),
        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : null,
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : null,
      };

      if (projectData) {
        // 데이터가 있으면 수정
        await apiMainPage.patch(`/tasks/${projectId}`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        alert('프로젝트가 수정되었습니다.');
      } else {
        // 데이터가 없으면 생성
        await apiMainPage.post('/tasks', requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        alert('프로젝트가 등록되었습니다.');
      }

      navigate('/main');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error Response:', error.response?.data);
        if (error.response?.status === 401) {
          alert('인증에 실패하였습니다. 다시 로그인 해주세요.');
        } else if (error.response?.status === 404) {
          alert('등록되지 않은 사용자가 존재합니다.');
        } else if (error.response?.status === 400) {
          alert('중복된 사용자가 존재합니다.');
        } else {
          alert('등록에 실패하였습니다.');
        }
      } else {
        console.error('알 수 없는 error:', error);
        alert('등록에 실패하였습니다.');
      }
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
                  required
                />

                <Styled.Input
                  type="text"
                  placeholder="부제목을 입력하세요"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  required
                />

                <Styled.Input
                  type="text"
                  placeholder="작성자를 입력하세요"
                  value={author}
                  disabled
                />
                <Styled.TextArea
                  rows={12}
                  placeholder="프로젝트 내용"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
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
                    required
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
                    required
                  />
                  <Styled.DateDisplay>
                    {endDate ? format(endDate, 'yy-MM-dd') : 'yy-mm-dd'}
                  </Styled.DateDisplay>
                </Styled.DateInput>
              </Styled.DateBox>

              <Styled.Input
                type="text"
                placeholder="참가자를 쉼표로 구분하여 입력하세요"
                value={members.join(',')}
                onChange={(e) => {
                  const memberArray = e.target.value.split(',');
                  setMembers(memberArray);
                }}
                required
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
