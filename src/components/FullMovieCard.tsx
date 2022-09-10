import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/store';
import { fetchDeleteMovie } from '../store/slices/movieSlice';
import { FullMovie } from '../types';

type PropsType = {
  movie: FullMovie;
};

export const FullMovieCard = ({ movie }: PropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteMovie = async () => {
    await dispatch(fetchDeleteMovie(movie.id));
    navigate('/');
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
          <Button color="error" variant="contained" onClick={handleDeleteMovie}>
            Delete
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
