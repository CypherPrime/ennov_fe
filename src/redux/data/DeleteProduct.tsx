import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/services'; 

interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  ownerId: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  success: false,
};

export const deleteProductById = createAsyncThunk(
  'products/deleteProductById',
  async (productId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${productId}`);
      return productId; 
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to delete product');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default productSlice.reducer;
