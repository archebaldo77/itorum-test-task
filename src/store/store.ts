// libraries;
import { configureStore } from '@reduxjs/toolkit';

// api;
import { api } from '../api/api';

// reducers;
import { usersReducer } from './slices/users-slice';
import { repositoriesReducer } from './slices/repositories-slice';
import { currentUserReducer } from './slices/current-user-slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    repositories: repositoriesReducer,
    currentUser: currentUserReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
