import { Box, Grid, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import PasswordTextField from '../components/PasswordTextField';
import { useAppDispatch } from '../hooks/store';
import { fetchSignIn } from '../store/slices/userSlice';

export interface SignInFormValues {
  email: string;
  password: string;
}

const signInSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(8, 'Password is too short').required('Password is required'),
});

const SignInPage = () => {
  const dispatch = useAppDispatch();

  const handleSignIn = async (payload: SignInFormValues) => {
    dispatch(fetchSignIn(payload));
  };

  const { values, touched, errors, isSubmitting, handleSubmit, handleChange, handleBlur } =
    useFormik<SignInFormValues>({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: signInSchema,
      onSubmit: handleSignIn,
    });

  return (
    <Paper>
      <Box p={2} my={4}>
        <Typography component="h1" variant="h1" marginY={8} align="center">
          Login
        </Typography>
        <Grid container gap={2} component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
          <PasswordTextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mb: 2, p: 1 }}
          >
            Login
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SignInPage;
