import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you are using Redux for state management
import { useEffect } from 'react';
import UserMainPage from '../container/user/main-page';
import MainPageLayout from '../main-page-layout';

const MainRoutes = () => {
  console.log('Coming here??????');
  const { isAdmin } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.token) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    }
  }, [user, isAdmin, navigate]);

  return (
    <MainPageLayout>
      <Routes>
        <Route path="/" element={<UserMainPage />} />
      </Routes>
    </MainPageLayout>
  );
};

export default MainRoutes;
