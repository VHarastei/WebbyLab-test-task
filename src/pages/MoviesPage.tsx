import {
  Box,
  CircularProgress,
  Paper,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AddMovie } from '../components/AddMovie';
import { ShortMovieCard } from '../components/ShortMovieCard';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import useDebounce from '../hooks/useDebounce';
import {
  fetchMovies,
  selectMovies,
  selectMoviesLoadingStatus,
  selectMoviesMeta,
} from '../store/slices/moviesSlice';
import { Status } from '../types';

export const MoviesPage = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const moviesMeta = useAppSelector(selectMoviesMeta);
  const loadingStatus = useAppSelector(selectMoviesLoadingStatus);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearchTerm = useDebounce<string>(searchTerm);

  const handleChangePage = async (_: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPage(value);
  };

  const handleChangeSize = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSize(+event.target.value);
    setPage(0);
  };

  const handleChangeSearchTerm = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(
      fetchMovies({
        search: debouncedSearchTerm?.length! > 1 ? debouncedSearchTerm : null,
        sort: 'title',
        order: 'ASC',
        limit: size,
        offset: page * size,
      })
    );
  }, [dispatch, debouncedSearchTerm, size, page]);

  if (loadingStatus === Status.LOADING) return <CircularProgress />;

  return (
    <>
      <Box>
        {loadingStatus === Status.SUCCESS ? (
          <Box mt={2}>
            <Typography fontWeight="700" fontSize={28} color="primary">
              List of all movies
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Paper>
                <TextField
                  value={searchTerm}
                  onChange={handleChangeSearchTerm}
                  fullWidth
                  label="Search"
                  placeholder="Enter movie title or actor"
                />
              </Paper>
              <AddMovie />
            </Box>
            <Box>
              {movies.map((movie) => (
                <ShortMovieCard key={movie.id} movie={movie} />
              ))}
            </Box>
            <TablePagination
              color="primary"
              component="div"
              count={moviesMeta?.total || 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={size}
              rowsPerPageOptions={[
                { value: 3, label: '3' },
                { value: 10, label: '10' },
                { value: 20, label: '20' },
              ]}
              onRowsPerPageChange={handleChangeSize}
            />
          </Box>
        ) : (
          'Something went wrong'
        )}
      </Box>
    </>
  );
};
