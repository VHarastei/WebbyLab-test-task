import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Api } from '../../api';
import { loadState } from '../../common/loadState';
import { saveState } from '../../common/saveState';
import { SignInFormValues } from '../../pages/SignInPage';
import { SignUpFormValues } from '../../pages/SignUpPage';
import { User, Status, ResultCodes } from '../../types';
import { RootState } from '../index';

interface UserState {
  data: User | null;
  loadingStatus: Status;
}

const user = loadState<User>('user');

const initialState: UserState = {
  data: user || null,
  loadingStatus: Status.NEVER,
};

export const fetchSignUp = createAsyncThunk<User | null, SignUpFormValues>(
  'user/fetchSignUp',
  async (payload: SignUpFormValues) => {
    const { token, status } = await Api.signUp(payload);

    if (status === ResultCodes.SUCCESS) {
      const user = { email: payload.email, token };
      saveState<User>('user', user);

      return user;
    }
    return null;
  }
);

export const fetchSignIn = createAsyncThunk<User | null, SignInFormValues>(
  'user/fetchSignIn',
  async (payload: SignInFormValues) => {
    const { token, status } = await Api.signIn(payload);

    if (status === ResultCodes.SUCCESS) {
      const user = { email: payload.email, token };
      saveState<User>('user', user);

      return user;
    }
    return null;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('user');
      state.data = null;
      state.loadingStatus = Status.NEVER;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchSignUp.fulfilled.type, (state, { payload }: PayloadAction<User | null>) => {
        state.data = payload;
        state.loadingStatus = Status.SUCCESS;
      })
      .addCase(fetchSignUp.pending.type, (state) => {
        state.loadingStatus = Status.LOADING;
      })
      .addCase(fetchSignUp.rejected.type, (state) => {
        state.loadingStatus = Status.ERROR;
      })
      .addCase(fetchSignIn.fulfilled.type, (state, { payload }: PayloadAction<User | null>) => {
        state.data = payload;
        state.loadingStatus = Status.SUCCESS;
      })
      .addCase(fetchSignIn.pending.type, (state) => {
        state.loadingStatus = Status.LOADING;
      })
      .addCase(fetchSignIn.rejected.type, (state) => {
        state.loadingStatus = Status.ERROR;
      }),
});

export const { logOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.data;
export const selectUserLoadingStatus = (state: RootState) => state.user.loadingStatus;

export const userReducer = userSlice.reducer;
