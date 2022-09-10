import { Box, Button, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { ShortMovie } from '../types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { movieFormats } from '../common/constants';
import { Api } from '../api';

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  year: Yup.number().positive().required(),
  format: Yup.string().oneOf(movieFormats),
  actors: Yup.array().of(Yup.string()),
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export interface AddMovieFormValues extends Pick<ShortMovie, 'title' | 'year' | 'format'> {
  actors: string[];
}

// MUI caveat - https://mui.com/material-ui/guides/composition/#caveat-with-refs
export const AddMovie = forwardRef((_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const onSubmit = async (formValues: AddMovieFormValues) => {
    try {
      await Api.addMovie(formValues);
      handleModalClose();
    } catch (error) {
      alert(error);
    }
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
    validationSchema,
  });

  return (
    <Box>
      <Button variant="contained" onClick={handleModalOpen}>
        Add new movie
      </Button>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={style} ref={ref}>
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
                InputProps={{ inputProps: { min: 1, max: 2021 } }}
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
              />
              <Button disabled={isSubmitting} type="submit" variant="contained">
                Add
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
});
