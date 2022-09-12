import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { AddMovieFormValues } from '../../components/AddMovie';
import { FullMovie, ResultCodes, Status } from '../../types';
import { RootState } from '../index';

interface MovieState {
  data: FullMovie | null;
  loadingStatus: Status;
  deletionStatus: Status;
  additionStatus: Status;
}

const initialState: MovieState = {
  data: null,
  loadingStatus: Status.NEVER,
  deletionStatus: Status.NEVER,
  additionStatus: Status.NEVER,
};

export const fetchMovie = createAsyncThunk<FullMovie, number>(
  'movie/fetchMovie',
  async (id: number) => {
    const { data, status } = await Api.getMovie(id);

    if (data && status === ResultCodes.SUCCESS) {
      return data;
    }

    throw new Error('Something went wrong');
  }
);

export const fetchAddMovie = createAsyncThunk<FullMovie | null, AddMovieFormValues>(
  'movie/fetchAddMovie',
  async (payload: AddMovieFormValues) => {
    const { data, status } = await Api.addMovie(payload);

    if (data && status === ResultCodes.SUCCESS) {
      return data;
    }

    throw new Error('Something went wrong');
  }
);

export const fetchDeleteMovie = createAsyncThunk<void, number>(
  'movie/fetchDeleteMovie',
  async (id: number) => {
    const { status } = await Api.deleteMovie(id);

    if (status !== ResultCodes.SUCCESS) {
      return;
    }

    throw new Error('Something went wrong');
  }
);

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    resetMovieState: (state) => {
      state.data = initialState.data;
      state.loadingStatus = initialState.loadingStatus;
      state.additionStatus = initialState.additionStatus;
      state.deletionStatus = initialState.deletionStatus;
    },
  },
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
      })
      .addCase(fetchAddMovie.fulfilled.type, (state, { payload }: PayloadAction<FullMovie>) => {
        state.data = payload;
        state.additionStatus = Status.SUCCESS;
      })
      .addCase(fetchAddMovie.pending.type, (state) => {
        state.additionStatus = Status.LOADING;
      })
      .addCase(fetchAddMovie.rejected.type, (state) => {
        state.additionStatus = Status.ERROR;
      })
      .addCase(fetchDeleteMovie.fulfilled.type, (state) => {
        state.deletionStatus = Status.SUCCESS;
      })
      .addCase(fetchDeleteMovie.pending.type, (state) => {
        state.deletionStatus = Status.LOADING;
      })
      .addCase(fetchDeleteMovie.rejected.type, (state) => {
        state.deletionStatus = Status.ERROR;
      }),
});

export const selectMovie = (state: RootState) => state.movie.data;
export const selectMovieLoadingStatus = (state: RootState) => state.movie.loadingStatus;
export const selectMovieAdditionStatus = (state: RootState) => state.movie.additionStatus;
export const selectMovieDeletionStatus = (state: RootState) => state.movie.deletionStatus;

export const { resetMovieState } = movieSlice.actions;

export const movieReducer = movieSlice.reducer;
