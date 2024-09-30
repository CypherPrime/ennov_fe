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

export const updateProductsById = createAsyncThunk(
  'products/updateById',
  async ({ productId, product }: { productId: string; product: Partial<Product> }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/products/${productId}`, product);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Failed to update product');
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
      if (action.type === fetchProducts.fulfilled.type) {
        state.products = action.payload;
      }
    })
    .addCase(action.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to process the request';
    });
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handlePromiseLifecycle(builder, fetchProducts);
    handlePromiseLifecycle(builder, fetchProductsById);
    handlePromiseLifecycle(builder, updateProductsById);
  },
});

export default productSlice.reducer;
