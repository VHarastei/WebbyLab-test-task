import { Box, Modal } from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

type PropsType = {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
};

export const CustomModal = ({ isOpen, handleClose, children }: PropsType) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};
