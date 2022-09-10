import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { FullMovie, Status } from '../../types';
import { RootState } from '../index';

interface MovieState {
  data: FullMovie | null;
  loadingStatus: Status;
}

const initialState: MovieState = {
  data: null,
  loadingStatus: Status.NEVER,
};

export const fetchMovie = createAsyncThunk<FullMovie, number>(
  'movie/fetchMovie',
  async (id: number) => {
    const { data } = await Api.getMovie(id);

    return data;
  }
);

export const fetchDeleteMovie = createAsyncThunk<void, number>(
  'movie/fetchDeleteMovie',
  async (id: number) => {
    await Api.deleteMovie(id);
  }
);

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchMovie.fulfilled.type, (state, { payload }: PayloadAction<FullMovie>) => {
        state.data = payload;
        state.loadingStatus = Status.SUCCESS;
      })
      .addCase(fetchMovie.pending.type, (state) => {
        state.loadingStatus = Status.LOADING;
      })
      .addCase(fetchMovie.rejected.type, (state) => {
        state.loadingStatus = Status.ERROR;
      }),
});

export const selectMovie = (state: RootState) => state.movie.data;
export const selectMovieLoadingStatus = (state: RootState) => state.movie.loadingStatus;

export const movieReducer = movieSlice.reducer;
