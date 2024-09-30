import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/services";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
'/',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Login failed');
    }
  }
);

export const signupUser = createAsyncThunk(
  '/signupUser',
  async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Signup failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  return true;
});

function handlePromiseLifecycle(builder:any, action:any, defaultErrorMsg = 'Operation failed') {
  builder
    .addCase(action.pending, (state:any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(action.fulfilled, (state:any, action:any) => {
      localStorage.setItem('token',action.payload.accessToken)
      state.loading = false;
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
    })
    .addCase(action.rejected, (state:any, action:any) => {
      state.loading = false;
      state.error = action.payload as string || defaultErrorMsg;
      state.isAuthenticated = false;
    });
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    handlePromiseLifecycle(builder, loginUser);
    handlePromiseLifecycle(builder, signupUser);
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = null;
      state.isAuthenticated = false;
    });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;