import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRoles as getRolesService } from '@services/roles';

const entity = 'roles';

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
      .addCase(getRoles.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const getRoles = createAsyncThunk(`${entity}/getAll`, async (arg, { getState }) => {
  const state = getState();
  const data = state[entity].data;
  if (data.length > 0) {
    return Promise.resolve(data);
  }
  const response = await getRolesService();
  return response;
});
