// libraries;
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// components;
import { Loader } from '../../components/loader/loader';
import { ErrorIndicator } from '../../components/error-indicator/error-indicator';
import { ProfileList } from '../../components/profile-list/profile-list';
import { ProfileListEmpty } from '../../components/profile-list-empty/profile-list-empty';
import { Pagination } from '../../components/pagination/pagination';

// hooks;
import { useAppDispatch, useAppSelector } from '../../store/hooks/common';

// redux;
import { getUsers, LoadingState } from '../../store/slices/users-slice';

// helpers;
import { RENDER_USERS_PER_PAGE, SearchParam } from '../../helpers/const';

// styles;
import './main.scss';

export const Main = () => {
  const appDispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const {
    entities: users,
    totalCount,
    loading,
    error,
  } = useAppSelector((state) => state.users);

  const login = String(searchParams.get(SearchParam.LOGIN));
  const page = Number(searchParams.get(SearchParam.PAGE));

  const maxPages = Math.ceil(Number(totalCount) / RENDER_USERS_PER_PAGE);

  useEffect(() => {
    if (login && page) {
      appDispatch(getUsers({ login, page }));
    }
  }, []);

  return (
    <main className='main-page'>
      {error && <ErrorIndicator errorMessage='Something went wrong' />}
      {loading === LoadingState.LOADING && error === null && <Loader />}
      {users.length > 0
        ? loading === LoadingState.IDLE && <ProfileList users={users} />
        : loading === LoadingState.IDLE && <ProfileListEmpty />}
      {maxPages > 1 && users.length > 0 && <Pagination maxPages={maxPages} />}
    </main>
  );
};
