import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/services';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get<User[]>('/users');
  return response.data;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: string) => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
});

function handlePromiseLifecycle(builder: any, action: any) {
  builder
    .addCase(action.pending, (state: UserState) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(action.fulfilled, (state: UserState, action: any) => {
      state.loading = false;
      state.users = action.payload; 
      state.user = action.payload; 
    })
    .addCase(action.rejected, (state: UserState, action: any) => {
      state.loading = false;
      state.error = action.payload || action.error.message || 'Failed to fetch data';
    });
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handlePromiseLifecycle(builder, fetchUsers);
    handlePromiseLifecycle(builder, fetchUserById);
  },
});

export default userSlice.reducer;
