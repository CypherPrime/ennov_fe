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


export const updateProduct = createAsyncThunk(
  'products/addProduct',
  async ({productId, product }:{productId:String, product:Product} ,{ rejectWithValue }) => {
    try {
      const response = await api.patch(`/products/${productId}`, product);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to Update product');
    }
  }
);

const EditProductSlice = createSlice({
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
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetState } = EditProductSlice.actions;
export default EditProductSlice.reducer;
