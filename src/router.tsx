import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/layouts';
import { HomePage, ProductPage, SearchResultsPage } from './pages/index.ts';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "search/:search-text",
        element: <SearchResultsPage />,
      },
    ]
  }
]);
