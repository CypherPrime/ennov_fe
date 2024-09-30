import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { deleteUserById, fetchUserById, updateUserById } from '../redux/data/UserAccount';

const UserAccounts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const { user, loading, error, success } = useSelector((state: RootState) => state.UserAccountSlice);

  const [isEditable, setIsEditable] = useState(false);
  const [formState, setFormState] = useState({
    name: user?.name,
    email: user?.email,
    dateJoined: user?.dateJoined,
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFormState({
        name: user.name,
        email: user.email,
        dateJoined: user.dateJoined,
      });
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      setIsEditable(false);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('====================================');
    console.log('not functional now');
    console.log('====================================');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUserById(userId!)).then(() => {
        toast.success('User deleted successfully');
      });
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: '500px', margin: '0 auto', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Details
      </Typography>
      
      {loading && <CircularProgress />}

      {!loading && user && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                variant="outlined"
                disabled={!isEditable}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                variant="outlined"
                disabled={!isEditable}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date Joined"
                name="dateJoined"
                value={formState.dateJoined}
                variant="outlined"
                disabled={true} 
              />
            </Grid>

            <Grid item xs={12}>
              {!isEditable ? (
                <Button variant="contained" color="primary" fullWidth onClick={() => setIsEditable(true)}>
                  Edit
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="secondary" fullWidth>
                  Submit
                </Button>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
                Delete User
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default UserAccounts;
