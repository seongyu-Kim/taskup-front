import { useEffect, useState } from 'react';
import * as Styled from './TaskList.styled';
import Pagination from '@components/Pagination/Pagination';
import apiMainPage from '@apis/apiMainPage';
import { useUserStore } from '@stores/UserStore/userStore';
import { useNavigate, useLocation } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  sub_title: string;
  content: string;
  status: string;
  startDate: string;
  endDate: string;
  members: string[];
  author: string;
}

const itemsPerPage = 10;

export default function TaskList() {
  const { user } = useUserStore();
  const [totalItems, setTotalItems] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get('page') || '1', 10);
  };

  const [currentPage, setCurrentPage] = useState(getPageFromUrl());

  useEffect(() => {
    setCurrentPage(getPageFromUrl());
  }, [location.search]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newSearchParams = new URLSearchParams({
      page: newPage.toString(),
      pageSize: itemsPerPage.toString(),
      status: '',
    });
    navigate(
      {
        pathname: '/main/tasks',
        search: newSearchParams.toString(),
      },
      { replace: true },
    );
  };

  const [callTaskListData, setCallTaskListData] = useState<Task[]>([]);

  useEffect(() => {
    const callTaskList = async () => {
      if (!user || !user.name) {
        return;
      }
      try {
        const response = await apiMainPage.get(
          `/tasks?page=${currentPage}&pageSize=${itemsPerPage}&status`,
        );
        if (response && response.data) {
          const allTasks = response.data.data.data;
          const userTasks = allTasks.filter(
            (item: Task) => item.author?.includes(user.name) || item.members.includes(user.name),
          );
          setCallTaskListData(userTasks);
          setTotalItems(response.data.data.total);
        }
      } catch (error) {
        console.log('TASKLIST DATA CALL ERROR', error);
      }
    };

    callTaskList().catch(console.error);
  }, [currentPage, user]);

  if (!user) {
    return null;
  }

  const currentTasks = callTaskListData;

  const handleCompleteClick = (id: number) => {
    setCallTaskListData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'IN_PROGRESS' ? 'COMPLETED' : 'IN_PROGRESS',
            }
          : item,
      ),
    );
  };

  return (
    <Styled.TaskListMainContainer>
      <button
        onClick={() => {
          console.log('user', user);
          const tempUserData = {
            name: 'test_name',
            email: 'parkjh001217@naver.com',
          };
          localStorage.setItem('user', JSON.stringify(tempUserData));
          console.log('유저 데이터 삽입 완료');
        }}>
        유저 상태 확인
      </button>
      <Styled.ProjectListContainer>
        <Styled.ProjectListArea>
          <Styled.ProjectListTitle>
            <Styled.TitleText>아이디</Styled.TitleText>
          </Styled.ProjectListTitle>
          <Styled.ProjectListTitleName>
            <Styled.TitleText>제목</Styled.TitleText>
          </Styled.ProjectListTitleName>
          <Styled.ProjectListTitle>
            <Styled.TitleText>완료여부</Styled.TitleText>
          </Styled.ProjectListTitle>
        </Styled.ProjectListArea>
        <Styled.ProjectList>
          <List data={currentTasks} onClick={handleCompleteClick} />
        </Styled.ProjectList>
      </Styled.ProjectListContainer>
      {currentTasks.length !== 0 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      )}
    </Styled.TaskListMainContainer>
  );
}

const List = ({ data, onClick }: { data: Task[]; onClick: (id: number) => void }) => {
  if (data.length === 0) {
    return <p>프로젝트가 없습니다</p>;
  }

  return (
    <>
      {data.map(({ id, title, content, status }, index) => {
        const isEven = index % 2 == 0 ? '#e0e0e0' : 'white';
        const ellipsisContent = `${content.slice(0, 10)}...`;
        return (
          <Styled.ProjectListItem backgroundColor={isEven} key={id}>
            <Styled.ListTableBox>
              <Styled.ListTextValue>{id}</Styled.ListTextValue>
            </Styled.ListTableBox>
            <Styled.ListTextNameAreaBox>
              <Styled.ListTextValue>{title}</Styled.ListTextValue>
              <Styled.ListTextValue className="content">{ellipsisContent}</Styled.ListTextValue>
            </Styled.ListTextNameAreaBox>
            <Styled.ListTableBox>
              <Styled.ListTextValue
                onClick={() => {
                  onClick(id);
                }}>
                {status === 'COMPLETED' ? (
                  <Styled.StyledFaCircleCheck />
                ) : (
                  <Styled.StyledFaRegCheckCircle />
                )}
              </Styled.ListTextValue>
            </Styled.ListTableBox>
          </Styled.ProjectListItem>
        );
      })}
    </>
  );
};
