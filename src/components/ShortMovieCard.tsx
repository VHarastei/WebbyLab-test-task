import { Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ShortMovie } from '../types';

type PropsType = {
  movie: ShortMovie;
};

export const ShortMovieCard = ({ movie }: PropsType) => {
  return (
    <Paper>
      <Box display="flex" flexDirection="column" p={1} my={2}>
        <Link to={`/movies/${movie.id}`}>
          <Typography gutterBottom fontWeight="700" fontSize={20} color="primary">
            {movie.title}
          </Typography>
        </Link>
        <Box display="flex" gap={1}>
          <Typography>Format:</Typography>
          <Typography fontWeight="700">{movie.format}</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Typography>Year:</Typography>
          <Typography fontWeight="700">{movie.year}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
