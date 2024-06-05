import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AdminLayout from './components/layouts/admin/layout';
import MainLayout from './components/layouts/main/layout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainLayout />}>
        <Route index lazy={() => import('./pages/home')} />
        <Route path="category/:id" lazy={() => import('./pages/category')} />
        <Route path="product/:id" lazy={() => import('./pages/product')} />
        <Route path="checkout" lazy={() => import('./pages/checkout')} />
        <Route path="checkout-success" lazy={() => import('./pages/checkout-success')} />
        <Route path="search" lazy={() => import('./pages/search')} />
      </Route>
      <Route path="/login" lazy={() => import('./pages/login')} />
      <Route path="/signup" lazy={() => import('./pages/signup')} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index lazy={() => import('./pages/admin/dashboard')} />
        <Route path="products/:id" lazy={() => import('./pages/admin/products/edit')} />
        <Route path="products" lazy={() => import('./pages/admin/products/list')} />
        <Route path="purchases/:id" lazy={() => import('./pages/admin/purchases/view')} />
        <Route path="purchases" lazy={() => import('./pages/admin/purchases/list')} />
      </Route>
    </Route>,
  ),
);
