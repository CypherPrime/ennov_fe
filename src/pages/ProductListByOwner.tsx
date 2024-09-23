import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import AppModal from '../component/Modal';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByOwner } from '../redux/data/GetProductByOwnerData';
import { deleteProductById } from '../redux/data/DeleteProduct';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ProductListByOwner() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.productByOwnerSlice);
  const { success } = useSelector((state: RootState) => state.DeleteProductSlice);

  const userId = localStorage.getItem('userId');

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchProductsByOwner(userId));
    }
  }, [dispatch, userId]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const onCancel = () => setOpenModal(false)

  const onDeleteProduct = () => {
    dispatch(deleteProductById(userId as string));
    if (success) {
      toast.success('Product deleted successfully');
    } else{
      toast.error('Failed to delete product');
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div style={{ paddingBottom: 15 }}>
        Product list by User
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Updated At</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {product.title}
                  </TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.createdAt.slice(0, 10)}</TableCell>
                  <TableCell align="center">{product.updatedAt.slice(0, 10)}</TableCell>
                  <TableCell align="center">
                    <div>
                      <Button sx={{ color: '#000' }} onClick={handleClick}>
                        <MoreVertIcon />
                      </Button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                      >
                        <Button onClick={()=>navigate('/edit-product', {state:product})} sx={{ p: 1, color: '#000' }}>Edit</Button>
                        <Divider />
                        <AppModal onCancel={() => onCancel()} onDeleteProduct={() => onDeleteProduct()} open={openModal} handleOpen={handleOpenModal} handleClose={handleCloseModal} />
                      </Popover>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
