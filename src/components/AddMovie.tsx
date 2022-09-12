import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieFormats, movieSchema } from '../common/constants';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { fetchAddMovie, selectMovie, selectMovieAdditionStatus } from '../store/slices/movieSlice';
import { ShortMovie, Status } from '../types';
import { CustomModal } from './CustomModal';
import { UIContext } from './UIContextProvider';

export interface AddMovieFormValues extends Pick<ShortMovie, 'title' | 'year' | 'format'> {
  actors: string[];
}

export const AddMovie = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setAlert } = useContext(UIContext);
  const newMovie = useAppSelector(selectMovie);
  const additionStatus = useAppSelector(selectMovieAdditionStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const onSubmit = async (formValues: AddMovieFormValues) => {
    await dispatch(fetchAddMovie(formValues));
  };

  const {
    values,
    touched,
    errors,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik<AddMovieFormValues>({
    initialValues: {
      title: '',
      year: 2000,
      format: movieFormats[0],
      actors: [],
    },
    onSubmit,
    validationSchema: movieSchema,
  });

  useEffect(() => {
    if (additionStatus === Status.SUCCESS && newMovie) {
      setAlert({
        show: true,
        message: `Movie ${newMovie.title} added successfully`,
        severity: 'success',
      });
      handleModalClose();
      navigate(`/movies/${newMovie.id}`);
    }

    if (additionStatus === Status.ERROR) {
      setAlert({
        show: true,
        message: `Something went wrong when adding the movie`,
        severity: 'error',
      });
    }
  }, [newMovie, additionStatus, navigate, dispatch, setAlert]);

  return (
    <Box>
      <Button variant="contained" onClick={handleModalOpen}>
        Add new movie
      </Button>
      <CustomModal isOpen={isModalOpen} handleClose={handleModalClose}>
        <Typography gutterBottom fontWeight="700" fontSize={28} color="primary">
          Add new movie
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              name="title"
              onBlur={handleBlur}
              value={values.title}
              onChange={handleChange}
              placeholder="Title"
              label="Title"
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              fullWidth
            />
            <TextField
              name="year"
              onBlur={handleBlur}
              value={values.year}
              onChange={handleChange}
              placeholder="Year"
              label="Year"
              type="number"
              error={touched.year && Boolean(errors.year)}
              helperText={touched.year && errors.year}
              fullWidth
            />
            <Select
              name="format"
              onBlur={handleBlur}
              value={values.format}
              onChange={handleChange}
              placeholder="Format"
              label="Format"
              error={touched.format && Boolean(errors.format)}
              fullWidth
            >
              {movieFormats.map((format) => (
                <MenuItem key={format} value={format}>
                  {format}
                </MenuItem>
              ))}
            </Select>
            <TextField
              name="actors"
              onBlur={handleBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const actorsString = e.target.value;
                const actorsArray = actorsString.split(', ');

                setFieldValue('actors', actorsArray);
              }}
              placeholder="Enter the actors, separated by commas"
              label="Actors"
              error={touched.actors && Boolean(errors.actors)}
              helperText={touched.actors && errors.actors}
              fullWidth
              sx={{ whiteSpace: 'pre-wrap' }}
            />
            <Button disabled={isSubmitting} type="submit" variant="contained">
              Add
            </Button>
          </Box>
        </form>
      </CustomModal>
    </Box>
  );
};
