import { Footer, Header, Main } from '@organisms';

export default function MainLayout() {
  return (
    <>
      <Header />
      <Main>{<b>este es el body</b>}</Main>
      <Footer />
    </>
  );
}
