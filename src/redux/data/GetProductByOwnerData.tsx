import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/services';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  ownerId: null;
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProductsByOwner = createAsyncThunk(
  'products/fetchById',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/owner/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch products');
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
      state.error = action.payload as string || 'Failed to fetch products';
    });
}

const productByOwnerSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handlePromiseLifecycle(builder, fetchProductsByOwner);
  },
});

export default productByOwnerSlice.reducer;
