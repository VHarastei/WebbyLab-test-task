import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { movieReducer } from './slices/movieSlice';
import { moviesReducer } from './slices/moviesSlice';
import { userReducer } from './slices/userSlice';

export const rootReducer = combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
