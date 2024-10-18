import React, { useState, useEffect } from 'react';
import * as Styled from './ViewProject.styled';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import apiMainPage from '@apis/apiMainPage';
import SideBar from '../MainView/SideBar/SideBar';

interface ProjectData {
  title: string;
  subTitle: string;
  content: string;
  startDate: string;
  endDate: string;
  memebers: string;
}

const ViewProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [author, setAuthor] = useState<string>('');

  const navigation = useNavigate();

  const fetchProjectData = async () => {
    try {
      const response = await apiMainPage.get(`/tasks/${projectId}`);
      setProjectData(response.data.data);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  console.log('projectData', projectData);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser); // 문자열을 객체로 변환
      setAuthor(user.name); // 이름을 상태에 설정
    }
    fetchProjectData();
  }, [projectId]);

  if (!projectData) {
    return <h1>존재하지 않는 페이지입니다.</h1>;
  }

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    console.log('Token', token);

    if (window.confirm('프로젝트를 삭제하시겠습니까?')) {
      try {
        await apiMainPage.delete(`/tasks/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        alert('프로젝트가 삭제되었습니다.');
        navigation('/main');
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('프로젝트 삭제에 실패하였습니다.');
      }
    }
  };

  return (
    <Styled.Container>
      <SideBar />
      <Styled.ContentContainer>
        <Styled.BackBtn
          onClick={() => {
            navigation('/main');
          }}>
          <MdOutlineArrowBackIosNew />
          <Styled.BackBtnText>Back</Styled.BackBtnText>
        </Styled.BackBtn>
        <Styled.Content>
          <Styled.ContentBox>
            <Styled.ContentFlex>
              <Styled.ContentTitle>제목</Styled.ContentTitle>
              <Styled.ContentDescription>{projectData.title}</Styled.ContentDescription>
            </Styled.ContentFlex>
            <Styled.Hr />
            <Styled.ContentFlex>
              <Styled.ContentTitle>부제목</Styled.ContentTitle>
              <Styled.ContentDescription>{projectData.subTitle}</Styled.ContentDescription>
            </Styled.ContentFlex>
            <Styled.Hr />
            <Styled.ContentFlex>
              <Styled.ContentTitle>작성자</Styled.ContentTitle>
              <Styled.ContentDescription>{author}</Styled.ContentDescription>
            </Styled.ContentFlex>
            <Styled.Hr />
            <Styled.ContentFlex>
              <Styled.ContentTitle>내용</Styled.ContentTitle>
              <Styled.ContentDescription style={{ height: '10rem' }}>
                {projectData.content}
              </Styled.ContentDescription>
            </Styled.ContentFlex>
            <Styled.Hr />
            <Styled.ContentFlex>
              <Styled.ContentTitle>시작일</Styled.ContentTitle>
              <Styled.ContentDate>
                {new Date(projectData.startDate).toISOString().slice(2, 10)}
              </Styled.ContentDate>
              <Styled.MarginLeft left={70} />
              <Styled.ContentTitle>종료일</Styled.ContentTitle>
              <Styled.ContentDate>
                {new Date(projectData.endDate).toISOString().slice(2, 10)}
              </Styled.ContentDate>
            </Styled.ContentFlex>
            <Styled.Hr />
            <Styled.ContentFlex>
              <Styled.ContentTitle>참가자</Styled.ContentTitle>
              <Styled.ContentDescription>{projectData.memebers}</Styled.ContentDescription>
            </Styled.ContentFlex>
            <Styled.MarginTop top={60} />
            <Styled.BtnBox>
              <Styled.GreenBtn1
                onClick={() => {
                  navigation(`/create/${projectId}`, { state: projectData });
                }}>
                수정하기
              </Styled.GreenBtn1>
              <Styled.GreenBtn2 onClick={handleDelete}>삭제하기</Styled.GreenBtn2>
            </Styled.BtnBox>
          </Styled.ContentBox>
        </Styled.Content>
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export default ViewProject;
