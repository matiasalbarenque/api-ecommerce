import { Outlet } from 'react-router-dom';
import { Footer, Header, Main } from '@organisms';

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
