import { Box, Container, Link, Paper } from '@mui/material';
import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import { Movie } from './pages/Movie';
import { Movies } from './pages/Movies';

function App() {
  // useEffect(() => {
  //   const get = async () => {
  //     axios.get('http://localhost:8000/api/v1/movies?sort=year&order=DESC&limit=10&offset=0', {
  //       headers: {
  //         Authorization:
  //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnYXJhc3RleS52YXNAZ21haWwuY29tIiwibmFtZSI6IlZIYXJhc3RlciIsImNyZWF0ZWRBdCI6IjIwMjItMDktMDhUMTY6NDg6NTcuNTE2WiIsInVwZGF0ZWRBdCI6IjIwMjItMDktMDhUMTY6NDg6NTcuNTE2WiIsImlhdCI6MTY2MjY1NTczN30.igFPhAeiujgFynw-0srU3V_h9Q1E0dahyr-9Y0C-yn4',
  //       },
  //     });
  //   };

  //   get();
  // }, []);

  return (
    <Container>
      <Paper elevation={5}>
        <Box p={1} display="flex" gap={1}>
          <Link component={RouterLink} to="/">
            Home
          </Link>
        </Box>
      </Paper>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:movieId" element={<Movie />} />
      </Routes>
    </Container>
  );
}

export default App;
