import { RootState } from './../index';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Api, GetMoviesPayload, PaginationMeta, Response } from '../../api';
import { Status, ShortMovie, ResultCodes } from '../../types';

interface MoviesState {
  items: ShortMovie[];
  meta: PaginationMeta | null;
  loadingStatus: Status;
}

const initialState: MoviesState = {
  items: [],
  meta: null,
  loadingStatus: Status.NEVER,
};

export const fetchMovies = createAsyncThunk<
  Response<ShortMovie[], PaginationMeta>,
  GetMoviesPayload
>('movies/fetchMovies', async (payload: GetMoviesPayload) => {
  const response = await Api.getMovies(payload);

  if (response.data && response.meta && response.status === ResultCodes.SUCCESS) {
    return response;
  }

  throw new Error('Something went wrong');
});

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchMovies.fulfilled.type,
        (state, { payload }: PayloadAction<Response<ShortMovie[], PaginationMeta>>) => {
          state.items = payload?.data || [];
          state.meta = payload?.meta || null;
          state.loadingStatus = Status.SUCCESS;
        }
      )
      .addCase(fetchMovies.pending.type, (state) => {
        state.loadingStatus = Status.LOADING;
      })
      .addCase(fetchMovies.rejected.type, (state) => {
        state.loadingStatus = Status.ERROR;
      }),
});

export const selectMovies = (state: RootState) => state.movies.items;
export const selectMoviesMeta = (state: RootState) => state.movies.meta;
export const selectMoviesLoadingStatus = (state: RootState) => state.movies.loadingStatus;

export const moviesReducer = moviesSlice.reducer;
