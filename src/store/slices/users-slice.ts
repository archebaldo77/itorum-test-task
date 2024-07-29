// libraries;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// helpers;
import { LIMIT_USERS } from '../../helpers/const';

// types;
import { type ApiType } from '../../api/api';
import { type UserState } from '../../types/state/users-state';
import { type UsersResponseType } from '../../types/response-from-server/users';

export const getUsers = createAsyncThunk<
  UsersResponseType,
  { login: string; page: number },
  {
    rejectValue: string;
    extra: ApiType;
  }
>(
  `@@users/get-users`,
  async ({ login, page }, { rejectWithValue, extra: api }) => {
    try {
      const data = await api.getUsersByLogin({
        login,
        page,
      });

      const totalCount =
        data.totalCount >= LIMIT_USERS ? LIMIT_USERS : data.totalCount;

      return { ...data, totalCount };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue(`Something went wrong!`);
    }
  }
);

export enum LoadingState {
  LOADING = `loading`,
  IDLE = `idle`,
}

const initialState: UserState = {
  entities: [],
  totalCount: null,
  loading: LoadingState.IDLE,
  error: null,
};

export const usersSlice = createSlice({
  name: '@@users',
  initialState,
  reducers: {
    reset: (state) => {
      state.entities = [];
      state.totalCount = null;
      state.loading = LoadingState.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.entities = action.payload.users;
        state.totalCount = action.payload.totalCount;
        state.loading = LoadingState.IDLE;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = LoadingState.LOADING;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = LoadingState.IDLE;
        state.error =
          action.payload || action.error.message || `Something went wrong!`;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const { reset } = usersSlice.actions;
