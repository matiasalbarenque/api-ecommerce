import { Outlet } from 'react-router-dom';
import { Header, Main } from './';

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
