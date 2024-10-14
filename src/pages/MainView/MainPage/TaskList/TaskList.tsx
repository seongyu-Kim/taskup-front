import { useEffect, useState } from 'react';
import {
  MainPageContainer,
  ProjectListContainer,
  ProjectListArea,
  ProjectListTitle,
  TitleText,
  ProjectListTitleName,
  ProjectList,
  ProjectListItem,
  ListTableBox,
  ListTextValue,
  ListTextNameAreaBox,
  StyledFaCircleCheck,
  StyledFaRegCheckCircle,
} from './TaskList.styled';
import Pagination from '../../../../components/Pagination/Pagination';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  sub_title: string;
  content: string;
  status: number;
  members: string[];
  startDate: string;
  endDate: string;
  user: {
    name: string;
  };
}

export default function TaskList() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<
    Array<{
      id: number;
      title: string;
      content: string;
      status: number;
    }>
  >([]);

  //데이터 요청 값 저장
  const [allData, setAllData] = useState<Task[]>([]);

  //데이터 요청
  useEffect(() => {
    const callTaskListData = async () => {
      try {
        //나중에 주소 변경
        const response = await axios.get('http://localhost:4000/tasks');
        if (response && response.data) {
          setAllData(response.data.data.data);
          // setAllData(response.data.data);
          console.log(response.data.data.data);
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    };

    callTaskListData().catch(console.error);
  }, []);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedData = allData.slice(startIdx, endIdx);

    setCurrentData(paginatedData);
  }, [currentPage, allData]);

  const handleCompleteClick = (id: number) => {
    setAllData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: item.status == 1 ? 2 : 1 } : item,
      ),
    );
  };

  return Object.keys(allData).length == 0 ? (
    <>
      <MainPageContainer>
        <ProjectListContainer>
          <ProjectListArea>
            <ProjectListTitle>
              <TitleText>Num</TitleText>
            </ProjectListTitle>
            <ProjectListTitleName>
              <TitleText>Name</TitleText>
            </ProjectListTitleName>
            <ProjectListTitle>
              <TitleText>CheckBox</TitleText>
            </ProjectListTitle>
          </ProjectListArea>
          <ProjectList>
            <p>프로젝트가 없습니다</p>
          </ProjectList>
        </ProjectListContainer>
      </MainPageContainer>
    </>
  ) : (
    <>
      <MainPageContainer>
        <ProjectListContainer>
          <ProjectListArea>
            <ProjectListTitle>
              <TitleText>Num</TitleText>
            </ProjectListTitle>
            <ProjectListTitleName>
              <TitleText>Name</TitleText>
            </ProjectListTitleName>
            <ProjectListTitle>
              <TitleText>CheckBox</TitleText>
            </ProjectListTitle>
          </ProjectListArea>
          <ProjectList>
            {allData.map((item) => (
              <ProjectListItem
                backgroundColor={item.id % 2 === 0 ? '#e0e0e0' : 'white'}
                key={item.id}>
                <ListTableBox>
                  <ListTextValue>{item.id}</ListTextValue>
                </ListTableBox>
                <ListTextNameAreaBox>
                  <ListTextValue>{item.title}</ListTextValue>
                  <ListTextValue className="content">{`${item.content.slice(0, 10)}...`}</ListTextValue>
                </ListTextNameAreaBox>
                <ListTableBox>
                  <ListTextValue
                    onClick={() => {
                      handleCompleteClick(item.id);
                    }}>
                    {item.status === 1 ? <StyledFaCircleCheck /> : <StyledFaRegCheckCircle />}
                  </ListTextValue>
                </ListTableBox>
              </ProjectListItem>
            ))}
          </ProjectList>
        </ProjectListContainer>
        <Pagination
          arr={allData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </MainPageContainer>
    </>
  );
}
