import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/services';

interface Product {
  title: string;
  price: string;
  description: string;
  ownerId: string;
}

interface ProductState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProductState = {
  loading: false,
  error: null,
  success: false,
};

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await api.post('/products', product);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to add product');
    }
  }
);


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
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
  },
});

export const { resetState } = productSlice.actions;
export default productSlice.reducer;
