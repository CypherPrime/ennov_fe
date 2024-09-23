import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid2 } from '@mui/material';
import ProductCard from '../component/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { searchProducts } from '../redux/data/SearchProduct';

interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
}

export default function SearchResults() {
    const location = useLocation();
    const queryParams = location.state;

    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    const { products, loading, error } = useSelector((state: RootState) => state.searchSlice);

    React.useEffect(() => {
        dispatch(searchProducts(queryParams))
    }, [])

    if (loading) {
        return (
            <>
                <Typography variant="h4">Searching for "{queryParams}"....</Typography>
                <CircularProgress />
            </>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ p: 4 }}>
            {products.length > 1 ? products.map((item, id) => (
                <Grid2 key={id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <ProductCard name={item.title} description={item.description} price={item.price} onclickLearn={() => { navigate('/details', { state: item.id }) }} />
                </Grid2>
            )) : (
                <Typography variant='h3'> Oops No results for {queryParams} try searching something else</Typography>
            )}
        </Box>
    );
}
