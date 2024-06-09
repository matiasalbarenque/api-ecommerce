import { configureStore, combineSlices } from '@reduxjs/toolkit';
import categoriesSlice from './slices/CategoriesSlice';
import rolesSlice from './slices/RolesSlice';

export default configureStore({
  reducer: combineSlices(categoriesSlice, rolesSlice),
});
