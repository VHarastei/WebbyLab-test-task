import { FullMovie, ShortMovie, User } from '../types';
import axios from 'axios';
import { AddMovieFormValues } from '../components/AddMovie';
import qs from 'qs';
import { SignUpFormValues } from '../pages/SignUpPage';
import { SignInFormValues } from '../pages/SignInPage';
import { loadState } from '../common/loadState';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

instance.interceptors.request.use((config) => {
  const user = loadState<User>('user');

  if (user && config.headers) {
    config.headers.Authorization = user.token;
  }
  return config;
});

export interface GetMoviesPayload {
  search: string | null;
  sort: 'id' | 'title' | 'year' | null;
  order: 'ASC' | 'DESC' | null;
  limit: number | null;
  offset: number | null;
}

export interface Response<D, M = void> {
  data: D;
  meta?: M;
  status: number;
}

export interface AuthResponse {
  token: string;
  status: number;
}

export interface PaginationMeta {
  total: number;
}

export const Api = {
  signUp: (paylod: SignUpFormValues): Promise<AuthResponse> =>
    instance.post(`/users`, paylod).then(({ data }) => data),

  signIn: (paylod: SignInFormValues): Promise<AuthResponse> =>
    instance.post(`/sessions`, paylod).then(({ data }) => data),

  addMovie: (paylod: AddMovieFormValues): Promise<FullMovie> =>
    instance.post(`/movies`, paylod).then(({ data }) => data),

  deleteMovie: (id: number): Promise<void> => instance.delete(`/movies/${id}`),

  getMovie: (id: number): Promise<Response<FullMovie>> =>
    instance.get(`/movies/${id}`).then(({ data }) => data),

  getMovies: (payload: GetMoviesPayload): Promise<Response<ShortMovie[], PaginationMeta>> =>
    instance
      .get(`/movies${qs.stringify(payload, { addQueryPrefix: true, skipNulls: true })}`)
      .then(({ data }) => data),

  importMovies: (payload: FormData): Promise<Response<ShortMovie[], PaginationMeta>> =>
    instance
      .post(`/movies/import`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => data),
};
