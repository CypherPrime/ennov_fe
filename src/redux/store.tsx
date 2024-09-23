import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../redux/data/ProductData';
import userSlice from '../redux/data/User'
import authenticate from '../redux/data/authSlice'
import productByOwnerSlice from '../redux/data/GetProductByOwnerData'
import AddProducts from './data/AddProducts';
import UserAccount from './data/UserAccount';
import EditProduct from './data/EditProduct';
import DeleteProduct from './data/DeleteProduct';
import searchSlice from './data/SearchProduct'

const store = configureStore({
  reducer: {
    products: productReducer,
    users: userSlice,
    authSlice:authenticate,
    productByOwnerSlice:productByOwnerSlice,
    AddProductsSlice:AddProducts,
    UserAccountSlice:UserAccount,
    EditProductSlice:EditProduct,
    DeleteProductSlice:DeleteProduct,
    searchSlice:searchSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
