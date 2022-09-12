import { Box, Button, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { fetchDeleteMovie, selectMovieDeletionStatus } from '../store/slices/movieSlice';
import { FullMovie, Status } from '../types';
import { CustomModal } from './CustomModal';
import { UIContext } from './UIContextProvider';

type PropsType = {
  movie: FullMovie;
};

export const FullMovieCard = ({ movie }: PropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setAlert } = useContext(UIContext);

  const deletionStatus = useAppSelector(selectMovieDeletionStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  useEffect(() => {
    if (deletionStatus === Status.SUCCESS) {
      setAlert({
        show: true,
        message: `Movie ${movie.title} deleted successfully`,
        severity: 'success',
      });
      navigate('/');
    }

    if (deletionStatus === Status.ERROR) {
      setAlert({
        show: true,
        message: `Something went wrong when deleting the movie`,
        severity: 'error',
      });
    }
  }, [movie.title, deletionStatus, navigate, dispatch, setAlert]);

  const handleDeleteMovie = () => {
    dispatch(fetchDeleteMovie(movie.id));
  };

  return (
    <Paper>
      <Box display="flex" justifyContent="space-between" p={1} my={2}>
        <Box display="flex" flexDirection="column">
          <Typography gutterBottom fontWeight="700" fontSize={24} color="primary">
            {movie.title}
          </Typography>
          <Box display="flex" gap={1}>
            <Typography>Format:</Typography>
            <Typography fontWeight="700">{movie.format}</Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Typography>Year:</Typography>
            <Typography fontWeight="700">{movie.year}</Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Typography>Actors:</Typography>
            <Box>
              {movie.actors.map((actor) => (
                <Typography key={actor.id} fontWeight="700">
                  {actor.name}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
        <Box>
          <Button color="error" variant="contained" onClick={handleModalOpen}>
            Delete
          </Button>
          <CustomModal isOpen={isModalOpen} handleClose={handleModalClose}>
            <Typography gutterBottom fontWeight="700" fontSize={24} color="primary">
              Do you really want to proceed with deletion?
            </Typography>
            <Box display="flex" gap={1}>
              <Button fullWidth color="error" variant="contained" onClick={handleModalClose}>
                No
              </Button>
              <Button fullWidth variant="contained" onClick={handleDeleteMovie}>
                Yes
              </Button>
            </Box>
          </CustomModal>
        </Box>
      </Box>
    </Paper>
  );
};
