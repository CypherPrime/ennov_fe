import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProduct } from '../redux/data/EditProduct';

interface ProductFormState {
  title: string;
  price: string;
  description: string;
  ownerId: string;
}


function EditProduct() {

    const userId = localStorage.getItem('userId');
    const param = useLocation()
    const product = param.state
    const navigate = useNavigate()

  const [formState, setFormState] = useState<ProductFormState>({
    title: product.title,
    price: product.price,
    description: product.description,
    ownerId: userId as string,
  });
  
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, success } = useSelector((state: RootState) => state.EditProductSlice);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const productId  = product.id

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.title && formState.price && formState.description && formState.ownerId) {
      dispatch(updateProduct({productId, product: formState}));
      if (success) {
        toast.success('Product Updated successfully');
        setFormState({ title: '', price: '', description: '', ownerId: '' });
        navigate(-1)
      }
  
      if (error) {
        toast.error(error);
      }
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: '500px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Product
      </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Title"
              name="title"
              value={formState.title}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={formState.price}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Product'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default EditProduct
