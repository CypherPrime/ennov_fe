import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/services';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
}

interface SearchState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  products: [],
  loading: false,
  error: null,
};

export const searchProducts = createAsyncThunk(
  'products/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/search/${query}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to search products');
    }
  }
);

function handlePromiseLifecycle(builder: any, action: any) {
  builder
    .addCase(action.pending, (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(action.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(action.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    });
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearchState(state) {
      state.products = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    handlePromiseLifecycle(builder, searchProducts);
  },
});

export const { resetSearchState } = searchSlice.actions;
export default searchSlice.reducer;
