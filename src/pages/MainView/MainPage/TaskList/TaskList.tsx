import { useEffect, useState } from 'react';
import * as Styled from './TaskList.styled';
import Pagination from '@components/Pagination/Pagination';
import apiMainPage from '@apis/apiMainPage';
import { useUserStore } from '@stores/UserStore/userStore';
import { useNavigate } from 'react-router-dom';
import Divider from '@components/Divider';

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

const getPageFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('page') || '1', 10);
};

export default function TaskList() {
  const [totalItems, setTotalItems] = useState(0);
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const { user } = useUserStore();
  const navigate = useNavigate();
  const currentPage = getPageFromUrl();

  useEffect(() => {
    const callTaskList = async () => {
      const token = localStorage.getItem('token');
      if (!user || !user.name) {
        return;
      }
      try {
        const response = await apiMainPage.get(
          `/tasks?page=${currentPage}&pageSize=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response && response.data) {
          console.log('데이터 수신');
          const allTasks = response.data.data.data;
          const userTasks = allTasks.filter(
            (item: Task) => item.members.includes(user.name) || item.author === user.name,
          );
          setCurrentTasks(userTasks);
          setTotalItems(response.data.data.total);
        }
      } catch (error) {
        console.log('TASKLIST DATA CALL ERROR', error);
      }
    };

    callTaskList().catch(console.error);
  }, [currentPage, user]);

  const handlePageChange = (newPage: number) => {
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

  const handleCompleteClick = (id: number, status: string) => {
    const token = localStorage.getItem('token');
    // console.log(JSON.stringify({ status: 'IN_PROGRESS' }));
    const callTaskListStatusChange = async () => {
      try {
        const statusChange = status === 'IN_PROGRESS' ? 'COMPLETED' : 'IN_PROGRESS';
        await apiMainPage.patch(
          `/tasks/${id.toString()}`,
          { status: statusChange },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCurrentTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? { ...task, status: statusChange } : task)),
        );
      } catch (error) {
        console.log('TASK STATUS CHANGE ERROR', error);
      }
    };

    callTaskListStatusChange().catch(console.error);
  };

  if (!user) {
    return null;
  }

  return (
    <Styled.TaskListMainContainer>
      <Styled.ProjectListContainer>
        <TaskListHeader />
        <Styled.ProjectList>
          <TaskContentList data={currentTasks} onClick={handleCompleteClick} />
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
      <Divider />
    </Styled.TaskListMainContainer>
  );
}

const TaskListHeader = () => {
  return (
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
  );
};

const TaskContentList = ({
  data,
  onClick,
}: {
  data: Task[];
  onClick: (id: number, status: string) => void;
}) => {
  if (data.length === 0) {
    return <p>프로젝트가 없습니다</p>;
  }

  const sortedData = [...data].sort((a, b) => a.id - b.id);

  return (
    <>
      {sortedData.map(({ id, title, content, status }, index) => {
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
                  onClick(id, status);
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
