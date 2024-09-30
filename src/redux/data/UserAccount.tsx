import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/services';

interface User {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
}

interface UpdateUser {
  name: string;
  email: string;
  dateJoined: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch user');
    }
  }
);

export const updateUserById = createAsyncThunk(
  'user/updateById',
  async ({ userId, user }: { userId: string; user: UpdateUser }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/${userId}`, user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to update user');
    }
  }
);

export const deleteUserById = createAsyncThunk(
  'user/deleteById',
  async (userId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${userId}`);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to delete user');
    }
  }
);

function handlePromiseLifecycle(builder: any, action: any) {
  builder
    .addCase(action.pending, (state: UserState) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(action.fulfilled, (state: UserState, action: any) => {
      state.loading = false;
      if (action.meta.arg) {
        state.user = action.payload; 
        state.success = true;
      } else {
        state.user = null;
      }
    })
    .addCase(action.rejected, (state: UserState, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    });
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handlePromiseLifecycle(builder, fetchUserById);
    handlePromiseLifecycle(builder, updateUserById);
    handlePromiseLifecycle(builder, deleteUserById);
  },
});

export default userSlice.reducer;
