import { Outlet } from 'react-router-dom';
import Header from '../main/header';
import Main from './main';

export default function MainLayout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
