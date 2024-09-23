import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/services';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  ownerId:null;
  createdAt:string;
  updatedAt:string
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
    // alert(productId)
    try {
      const response = await api.get(`/products/owner/${productId as string}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch product');
    }
  }
);


const productByOwnerSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productByOwnerSlice.reducer;
