import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../component/ProductCard'
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProducts } from '../redux/data/ProductData';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <Grid container spacing={2}>
      {products ? products.map((item, id) => (
        <Grid key={id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ProductCard name={item.title} description={item.description} price={item.price} onclickLearn={() => { navigate('/details', { state: item.id }) }} />
        </Grid>
      )) : (
        <div>Prodduct list empty </div>
      )}
    </Grid>
  )
}

export default ProductPage
