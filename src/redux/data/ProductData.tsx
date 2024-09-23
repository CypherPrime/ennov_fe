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

export const fetchProducts = createAsyncThunk('/products', async () => {
  const response = await api.get('/products');
  return response.data;
});

export const fetchProductsById = createAsyncThunk(
  'products/fetchById',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch product');
    }
  }
);

export const UpdateProductsById = createAsyncThunk(
  'products/updateById',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/products/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch product');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })

      // products by id 
      .addCase(fetchProductsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })

      .addCase(UpdateProductsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateProductsById.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(UpdateProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
  },
});

export default productSlice.reducer;
