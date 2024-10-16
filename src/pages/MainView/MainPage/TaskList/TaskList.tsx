import { useEffect, useState } from 'react';
import * as Styled from './TaskList.styled';
import Pagination from '@components/Pagination/Pagination';
import apiMainPage from '@api/apiMainPage';
import { useUserStore } from '@stores/UserStore/userStore';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  sub_title: string;
  content: string;
  status: string;
  members: string[];
  startDate: string;
  endDate: string;
  user: {
    name: string;
  };
}

export default function TaskList() {
  const { user } = useUserStore();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  // const [completedState, setCompletedState] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage.toString() });
    navigate(`/main/tasks?page=${newPage}&pageSize=${itemsPerPage}&status`);
  };

  //데이터 요청 값 저장
  const [callTaskListData, setCallTaskListData] = useState<Task[]>([]);

  //데이터 요청
  useEffect(() => {
    const callTaskList = async () => {
      try {
        //나중에 주소 변경
        const response = await apiMainPage.get(
          `/tasks?page=${page}&pageSize=${itemsPerPage}&status`,
        );
        if (response && response.data) {
          console.log('TaksList 컴포넌트', response.data.message);
          setCallTaskListData(response.data.data.data);
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    };

    callTaskList().catch(console.error);
  }, [page]);

  if (!user) {
    return null;
  }
  //유저가 멤버로 들어가 있는 목록 필터링해서 넣어주기~
  const userTaskList = callTaskListData.filter((item) => item.members.includes(user.name));
  const currentTasks = userTaskList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //체크박스
  const handleCompleteClick = (id: number) => {
    setCallTaskListData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, status: item.status == 'IN_PROGRESS' ? 'COMPLETED' : 'IN_PROGRESS' }
          : item,
      ),
    );
  };
  return userTaskList.length == 0 ? (
    <>
      <Styled.MainPageContainer>
        <Styled.ProjectListContainer>
          <Styled.ProjectListArea>
            <Styled.ProjectListTitle>
              <Styled.TitleText>Num</Styled.TitleText>
            </Styled.ProjectListTitle>
            <Styled.ProjectListTitleName>
              <Styled.TitleText>Name</Styled.TitleText>
            </Styled.ProjectListTitleName>
            <Styled.ProjectListTitle>
              <Styled.TitleText>CheckBox</Styled.TitleText>
            </Styled.ProjectListTitle>
          </Styled.ProjectListArea>
          <Styled.ProjectList>
            <p>프로젝트가 없습니다</p>
          </Styled.ProjectList>
        </Styled.ProjectListContainer>
      </Styled.MainPageContainer>
    </>
  ) : (
    <>
      <Styled.MainPageContainer>
        <Styled.ProjectListContainer>
          <Styled.ProjectListArea>
            <Styled.ProjectListTitle>
              <Styled.TitleText>Num</Styled.TitleText>
            </Styled.ProjectListTitle>
            <Styled.ProjectListTitleName>
              <Styled.TitleText>Name</Styled.TitleText>
            </Styled.ProjectListTitleName>
            <Styled.ProjectListTitle>
              <Styled.TitleText>CheckBox</Styled.TitleText>
            </Styled.ProjectListTitle>
          </Styled.ProjectListArea>
          <Styled.ProjectList>
            {currentTasks.map((item, index) => (
              <Styled.ProjectListItem
                backgroundColor={index % 2 == 0 ? '#e0e0e0' : 'white'}
                key={item.id}>
                <Styled.ListTableBox>
                  <Styled.ListTextValue>{item.id}</Styled.ListTextValue>
                </Styled.ListTableBox>
                <Styled.ListTextNameAreaBox>
                  <Styled.ListTextValue>{item.title}</Styled.ListTextValue>
                  <Styled.ListTextValue className="content">{`${item.content.slice(0, 10)}...`}</Styled.ListTextValue>
                </Styled.ListTextNameAreaBox>
                <Styled.ListTableBox>
                  <Styled.ListTextValue
                    onClick={() => {
                      handleCompleteClick(item.id);
                    }}>
                    {item.status === 'IN_PROGRESS' ? (
                      <Styled.StyledFaCircleCheck />
                    ) : (
                      <Styled.StyledFaRegCheckCircle />
                    )}
                  </Styled.ListTextValue>
                </Styled.ListTableBox>
              </Styled.ProjectListItem>
            ))}
          </Styled.ProjectList>
        </Styled.ProjectListContainer>
        <Pagination
          pageLength={userTaskList.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      </Styled.MainPageContainer>
    </>
  );
}
