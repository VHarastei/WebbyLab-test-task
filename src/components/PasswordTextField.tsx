import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';
import React, { useState } from 'react';

interface PasswordTextFieldProps extends OutlinedInputProps {
  helperText?: string | false;
}

const PasswordTextField: React.FC<PasswordTextFieldProps> = ({
  id,
  error,
  helperText,
  label,
  ...props
}) => {
  const [show, setShow] = useState(false);

  const toggleShowPassword = () => setShow(!show);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={id} color={error ? 'error' : 'primary'}>
        {label}
      </InputLabel>
      <OutlinedInput
        {...props}
        id={id}
        label={label}
        type={show ? 'text' : 'password'}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default PasswordTextField;
