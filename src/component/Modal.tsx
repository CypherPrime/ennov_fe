import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid2 } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

interface AppModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  onDeleteProduct: () => void;
  onCancel: () => void;
}

const AppModal: React.FC<AppModalProps> = ({ open, handleOpen, handleClose, onDeleteProduct, onCancel }) => {
  return (
    <div>
      <Button sx={{ color: '#000' }} onClick={handleOpen}>Delete</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are You sure you want to delete this product?
          </Typography>
          <Grid2 container sx={{ justifyContent: 'center', alignItems: 'center', pt: 3, gap: 5 }}>
            <Grid2 >
              <Button onClick={onDeleteProduct} sx={{ backgroundColor: '#ff4b2b', textTransform: 'capitalize', color: '#ffff' }}>Delete</Button>
            </Grid2>
            <Grid2 >
              <Button onClick={onCancel} sx={{ borderColor: '#ff4b2b', color: '#ff4b2b', borderWidth: 1, textTransform: 'capitalize' }}>Cancel</Button>
            </Grid2>
          </Grid2>
        </Box>
      </Modal>
    </div>
  );
};

export default AppModal;
