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

function handlePromiseLifecycle(builder: any, action: any) {
  builder
    .addCase(action.pending, (state: any) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(action.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.success = true;
    })
    .addCase(action.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    handlePromiseLifecycle(builder, deleteProductById);
  },
});

export const { resetState } = productSlice.actions;
export default productSlice.reducer;
