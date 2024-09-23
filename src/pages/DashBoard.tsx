import Grid from '@mui/material/Grid2';
import UserCountCard from '../component/UserCards';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from '../redux/data/User';
import { fetchProducts } from '../redux/data/ProductData';


function DashBoard() {

  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  const product = useSelector((state:RootState)=>state.products.products)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchUsers());
  }, [dispatch]);


  if (loading) {
    return <p>Loading users and products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          {users ? (
            <UserCountCard userCount={users.length} days={'30'} percentage={50} type={'Users'} />
          ) : (
            <div> data not available</div>
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          {users ? (
            <UserCountCard userCount={product.length} days={'30'} percentage={50} type={'Products'} />
          ) : (
            <div> data not available</div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default DashBoard
