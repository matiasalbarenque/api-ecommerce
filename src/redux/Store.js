import { configureStore, combineSlices } from '@reduxjs/toolkit';
import authSlice from './slices/AuthSlice';
import cartSlice from './slices/CartSlice';
import categoriesSlice from './slices/CategoriesSlice';
import rolesSlice from './slices/RolesSlice';

export default configureStore({
  reducer: combineSlices(authSlice, cartSlice, categoriesSlice, rolesSlice),
});
