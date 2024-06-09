import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories as getCategoriesService } from '@services/categories';

const entity = 'categories';

const initialState = {
  isLoading: true,
  error: null,
  data: [],
};

export default createSlice({
  name: entity,
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const getCategories = createAsyncThunk(`${entity}/getAll`, async (arg, { getState }) => {
  const state = getState();
  const data = state[entity].data;
  if (data.length > 0) {
    return Promise.resolve(data);
  }
  const response = await getCategoriesService();
  return response;
});
