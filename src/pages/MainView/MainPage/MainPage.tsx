import styled from 'styled-components';
import TaskList from './TaskList/TaskList';

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default function MainPage() {
  return (
    <MainBox>
      <TaskList />
    </MainBox>
  );
}
