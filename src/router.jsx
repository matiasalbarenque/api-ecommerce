import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AdminLayout from './components/layouts/admin/LayoutComp';
import MainLayout from './components/layouts/main/LayoutComp';
import { AdminDashboardPage } from './pages/admin/DashboardPage';
import { AdminProductsEditPage } from './pages/admin/products/EditPage';
import { AdminProductsListPage } from './pages/admin/products/ListPage';
import { AdminPurchasesListPage } from './pages/admin/purchases/ListPage';
import { AdminPurchasesViewPage } from './pages/admin/purchases/ViewPage';
import { CategoryPage } from './pages/CategoryPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutSuccessPage } from './pages/CheckoutSuccess';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { SearchPage } from './pages/SearchPage';
import { SignupPage } from './pages/SignupPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="products/:id" element={<AdminProductsEditPage />} />
        <Route path="products" element={<AdminProductsListPage />} />
        <Route path="purchases/:id" element={<AdminPurchasesViewPage />} />
        <Route path="purchases" element={<AdminPurchasesListPage />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="category/:id" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="checkout-success" element={<CheckoutSuccessPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Route>,
  ),
);
