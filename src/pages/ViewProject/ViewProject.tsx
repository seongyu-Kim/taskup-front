import React, { useState, useEffect } from 'react';
import * as Styled from './ViewProject.styled';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../MainView/SideBar/SideBar';

interface ProjectData {
  title: string;
  subtitle: string;
  author: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: string;
}

const ViewProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const navigation = useNavigate();

  const fetchProjectData = async () => {
    try {
      // const response = await axios.get(`/task/${projectId}`);
      // setProjectData(response.data);

      const dummyData: ProjectData = {
        title: 'TaskUp',
        subtitle: '업무 관리 웹 애플리케이션',
        author: '김선규',
        description: '엘리스 1차 프로젝트.\n업무 관리 웹 애플리케이션\n이름:TaskUp.',
        startDate: '2023-10-01',
        endDate: '2023-10-01',
        participants: '김선규, 박주호, 김하영, 백기준',
      };
      setProjectData(dummyData);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  //프로젝트 수정...
  // const handleUpdate = async () => {
  //   try {
  //     if (projectData) {
  //       const updatedData = {
  //         ...projectData,
  //         title: '',
  //         description: '',
  //       };

  //       await axios.patch(`/tasks/${projectId}`, updatedData);
  //       alert('프로젝트가 수정되었습니다.');
  //       fetchProjectData();
  //     }
  //   } catch (error) {
  //     console.error('프로젝트를 수정 실패:', error);
  //     alert('프로젝트 수정에 실패하였습니다.');
  //   }
  // };

  const handleDelete = async () => {
    if (window.confirm('프로젝트를 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/tasks/${projectId}`);
        alert('프로젝트가 삭제되었습니다.');
        navigation('/main');
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('프로젝트 삭제에 실패하였습니다.');
      }
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  if (!projectData) {
    return <p>Loading...</p>;
  }

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
              <Styled.ContentDescription>{projectData.subtitle}</Styled.ContentDescription>
            </Styled.ContentFlex>
            <Styled.Hr />
            <Styled.ContentFlex>
              <Styled.ContentTitle>작성자</Styled.ContentTitle>
              <Styled.ContentDescription>{projectData.author}</Styled.ContentDescription>
            </Styled.ContentFlex>
            <Styled.Hr />
            <Styled.ContentFlex>
              <Styled.ContentTitle>내용</Styled.ContentTitle>
              <Styled.ContentDescription style={{ height: '10rem' }}>
                {projectData.description.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Styled.ContentDescription>
            </Styled.ContentFlex>
            <Styled.Hr />
            <Styled.ContentFlex>
              <Styled.ContentTitle>시작일</Styled.ContentTitle>
              <Styled.ContentDate>{projectData.startDate}</Styled.ContentDate>
              <Styled.MarginLeft left={70} />
              <Styled.ContentTitle>종료일</Styled.ContentTitle>
              <Styled.ContentDate>{projectData.endDate}</Styled.ContentDate>
            </Styled.ContentFlex>
            <Styled.Hr />
            <Styled.ContentFlex>
              <Styled.ContentTitle>참가자</Styled.ContentTitle>
              <Styled.ContentDescription>{projectData.participants}</Styled.ContentDescription>
            </Styled.ContentFlex>
            <Styled.MarginTop top={60} />
            <Styled.BtnBox>
              <Styled.GreenBtn1>수정하기</Styled.GreenBtn1>
              <Styled.GreenBtn2 onClick={handleDelete}>삭제하기</Styled.GreenBtn2>
            </Styled.BtnBox>
          </Styled.ContentBox>
        </Styled.Content>
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export default ViewProject;
