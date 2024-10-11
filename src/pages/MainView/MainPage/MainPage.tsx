import TaskList from './TaskList/TaskList';
import CalenderView from './CalenderView/CalenderView';
import { MainBox } from './MainPage.styled';
import { useEffect } from 'react';
import { useProfileImgStore } from '../../../stores/ProfileImgStore/ProfileImgStore';
import defaultImg from '../../../assets/임시 프로필사진.png';
export default function MainPage() {
  const { imageUrl, setImageUrl } = useProfileImgStore();
  useEffect(() => {
    setImageUrl(defaultImg);
  }, [imageUrl, setImageUrl]);
  return (
    <MainBox>
      <TaskList />
      <CalenderView />
    </MainBox>
  );
}
