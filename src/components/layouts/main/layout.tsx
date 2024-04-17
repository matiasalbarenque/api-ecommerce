import { Outlet } from 'react-router-dom';
import { Footer, Header, Main } from './';

export default function MainLayout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}
