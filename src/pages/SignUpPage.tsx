import { Grid, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import PasswordTextField from '../components/PasswordTextField';
import * as Yup from 'yup';
import { useAppDispatch } from '../hooks/store';
import { fetchSignUp } from '../store/slices/userSlice';

export interface SignUpFormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  name: Yup.string().required('Fullname is required'),
  password: Yup.string().min(8, 'Password is too short').required('Password is required'),
  confirmPassword: Yup.string()
    .required('Please repeat your password')
    .oneOf([Yup.ref('password'), null], "Passwords don't match."),
});

const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const handleSignUp = (payload: SignUpFormValues) => {
    dispatch(fetchSignUp(payload));
  };

  const { values, touched, errors, isSubmitting, handleSubmit, handleChange, handleBlur } =
    useFormik<SignUpFormValues>({
      initialValues: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: signUpSchema,
      onSubmit: handleSignUp,
    });

  return (
    <Paper>
      <Box p={2} my={4}>
        <Typography component="h1" variant="h1" marginY={8} align="center">
          Register
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
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
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
          <PasswordTextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Repeat password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && !!errors.confirmPassword}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mb: 2, p: 1 }}
          >
            Register
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SignUpPage;
