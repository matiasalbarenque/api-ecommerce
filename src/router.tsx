import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/layouts';
import { CategoryPage, HomePage, ProductPage, SearchResultsPage } from './pages';
import { AdminProductsEditPage, AdminProductsListPage, AdminUsersEditPage, AdminUsersListPage } from './pages/admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'category/:id',
        element: <CategoryPage />,
      },
      {
        path: 'product/:id',
        element: <ProductPage />,
      },
      {
        path: 'search',
        element: <SearchResultsPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <b>Admin home</b>,
      },
      {
        path: 'products/:id',
        element: <AdminProductsEditPage />,
      },
      {
        path: 'products',
        element: <AdminProductsListPage />,
      },
      {
        path: 'users/:id',
        element: <AdminUsersEditPage />,
      },
      {
        path: 'users',
        element: <AdminUsersListPage />,
      },
    ],
  },
]);
