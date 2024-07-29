// libraries;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// helpers;
import { LoadingState } from './users-slice';

// types;
import { type CurrentUserState } from '../../types/state/current-user-state';
import { type UserUiType } from '../../types/response-from-server/user';
import { type ApiType } from '../../api/api';

export const getCurrentUser = createAsyncThunk<
  UserUiType,
  string,
  {
    rejectValue: string;
    extra: ApiType;
  }
>(`@@current-user`, async (login, { rejectWithValue, extra: api }) => {
  try {
    const data = await api.getUserByLogin(login);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue(`Something went wrong!`);
  }
});

const initialState: CurrentUserState = {
  data: {
    id: null,
    login: null,
    name: null,
    avatarUrl: null,
    htmlUrl: null,
  },
  loading: LoadingState.IDLE,
  error: null,
};

const currentUserSlice = createSlice({
  name: `@@current-user`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.data = { ...action.payload };
        state.loading = LoadingState.IDLE;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = LoadingState.LOADING;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = LoadingState.IDLE;
        state.error =
          action.payload || action.error.message || `Something went wrong!`;
      });
  },
});

export const currentUserReducer = currentUserSlice.reducer;
