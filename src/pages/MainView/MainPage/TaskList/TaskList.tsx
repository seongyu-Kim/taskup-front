import { useEffect, useState } from 'react';
import * as Styled from './TaskList.styled';
import Pagination from '@components/Pagination/Pagination';
import axios from '@api/axios';
import { useUserStore } from '@stores/UserStore/userStore';

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
  const { user } = useUserStore();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  //데이터 요청 값 저장
  const [callTaskListData, setCallTaskListData] = useState<Task[]>([]);

  //데이터 요청
  useEffect(() => {
    const callTaskList = async () => {
      try {
        //나중에 주소 변경
        const response = await axios.get('/tasks');
        if (response && response.data) {
          setCallTaskListData(response.data.data.data);
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    };

    callTaskList().catch(console.error);
  }, []);

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
        item.id === id ? { ...item, status: item.status == 1 ? 2 : 1 } : item,
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
                    {item.status === 1 ? (
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
          setCurrentPage={setCurrentPage}
        />
      </Styled.MainPageContainer>
    </>
  );
}
