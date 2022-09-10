import { Box, Button, Container, Link, Paper, Typography } from '@mui/material';
import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAppDispatch, useAppSelector } from './hooks/store';
import { ImportMoviePage } from './pages/ImportMoviePage';
import { MoviePage } from './pages/MoviePage';
import { MoviesPage } from './pages/MoviesPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { logOut, selectUser } from './store/slices/userSlice';

function App() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={5}>
        <Box p={1} display="flex" gap={1}>
          {!!user ? (
            <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
              <Box display="flex" gap={1}>
                <Link component={RouterLink} to="/">
                  <Typography fontSize={24}>Home</Typography>
                </Link>
                <Link component={RouterLink} to="/movies/import">
                  <Typography fontSize={24}>Import movies</Typography>
                </Link>
              </Box>
              <Box display="flex" gap={1}>
                <Typography fontSize={18}>{user.email}</Typography>
                <Button variant="contained" onClick={handleLogOut}>
                  Log Out
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Link component={RouterLink} to="/sign-in">
                <Typography fontSize={24}>Sign In</Typography>
              </Link>
              <Link component={RouterLink} to="/sign-up">
                <Typography fontSize={24}>Sign Up</Typography>
              </Link>
            </>
          )}
        </Box>
      </Paper>

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuth={!!user}>
              <MoviesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <ProtectedRoute isAuth={!!user}>
              <MoviePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/import"
          element={
            <ProtectedRoute isAuth={!!user}>
              <ImportMoviePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sign-in"
          element={
            <ProtectedRoute isAuth={!!!user} redirectPath="/">
              <SignInPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <ProtectedRoute isAuth={!!!user} redirectPath="/">
              <SignUpPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
