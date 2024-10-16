import TaskList from './TaskList/TaskList';
import CalenderView from './CalenderView/CalenderView';
import * as Styled from './MainPage.styled';
import SideBar from '@pages/MainView/SideBar/SideBar';
export default function MainPage() {
  return (
    <Styled.MainBox>
      <SideBar />
      <Styled.MainContent>
        <TaskList />
        <CalenderView />
      </Styled.MainContent>
    </Styled.MainBox>
  );
}
