// libraries;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// helpers;
import { LoadingState } from './users-slice';

// types;
import { type ApiType } from '../../api/api';
import { type RepositoriesState } from '../../types/state/repositories-state';
import { type RepositoriesUiType } from '../../types/response-from-server/repositories';

export const getRepositories = createAsyncThunk<
  RepositoriesUiType[],
  string,
  {
    rejectValue: string;
    extra: ApiType;
  }
>(`@@repositories`, async (login, { rejectWithValue, extra: api }) => {
  try {
    const data = api.getRepositoriesByLogin(login);

    return data;
  } catch (error) {
    return rejectWithValue(`Something went wrong!`);
  }
});

const initialState: RepositoriesState = {
  entities: [],
  loading: LoadingState.IDLE,
  error: null,
};

export const repositoriesSlice = createSlice({
  name: `@@repositories`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRepositories.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = LoadingState.IDLE;
      })
      .addCase(getRepositories.pending, (state) => {
        state.loading = LoadingState.LOADING;
        state.error = null;
      })
      .addCase(getRepositories.rejected, (state, action) => {
        state.loading = LoadingState.IDLE;
        state.error =
          action.payload || action.error.message || `Something went wrong!`;
      });
  },
});

export const repositoriesReducer = repositoriesSlice.reducer;
