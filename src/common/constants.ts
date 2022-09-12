import { MovieFormat } from '../types';
import * as Yup from 'yup';

export const movieFormats: MovieFormat[] = ['VHS', 'DVD', 'Blu-Ray'];

export const movieSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  year: Yup.number().positive().max(2021).required(),
  format: Yup.string().oneOf(movieFormats),
  actors: Yup.array().of(
    Yup.string().matches(
      /[a-zA-Z,-\s]+$/,
      ({ value }) => `${value} must match pattern: Willem Dafoe or Anya Taylor-Joy\n`
    )
  ),
});
