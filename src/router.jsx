import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import AdminLayout from './components/layouts/admin/Layout';
import MainLayout from './components/layouts/main/Layout';
import { AdminDashboardPage } from './pages/admin/Dashboard';
import { AdminProductsEditPage } from './pages/admin/products/Edit';
import { AdminProductsListPage } from './pages/admin/products/List';
import { AdminPurchasesListPage } from './pages/admin/purchases/List';
import { AdminPurchasesViewPage } from './pages/admin/purchases/View';
import { CategoryPage } from './pages/Category';
import { CheckoutPage } from './pages/Checkout';
import { CheckoutSuccessPage } from './pages/CheckoutSuccess';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ProductPage } from './pages/Product';
import { SearchPage } from './pages/Search';
import { SignupPage } from './pages/Signup';

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
