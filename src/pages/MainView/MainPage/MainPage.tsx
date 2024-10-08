import TaskList from './TaskList/TaskList';
import CalenderView from './Calender/CalenderView';
import { MainBox } from './MainPage.styled';

export default function MainPage() {
  return (
    <MainBox>
      <TaskList />
      <CalenderView />
    </MainBox>
  );
}
