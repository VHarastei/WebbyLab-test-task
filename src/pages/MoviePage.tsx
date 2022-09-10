import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FullMovieCard } from '../components/FullMovieCard';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { fetchMovie, selectMovie, selectMovieLoadingStatus } from '../store/slices/movieSlice';
import { Status } from '../types';

export const MoviePage = () => {
  const params = useParams();
  const movieId = params.movieId;

  const dispatch = useAppDispatch();
  const movie = useAppSelector(selectMovie);
  const loadingStatus = useAppSelector(selectMovieLoadingStatus);

  useEffect(() => {
    if (movieId) dispatch(fetchMovie(+movieId));
  }, [movieId, dispatch]);

  if (loadingStatus === Status.LOADING) return <CircularProgress />;

  return (
    <Box>
      {loadingStatus === Status.SUCCESS && movie ? (
        <FullMovieCard movie={movie} />
      ) : (
        'Something went wrong'
      )}
    </Box>
  );
};
