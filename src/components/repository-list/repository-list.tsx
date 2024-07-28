// libraries;
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// components;
import { RepositoryItem } from '../repository-item/repository-item';
import { RepositoryListEmpty } from '../repository-list-empty/repository-list-empty';
import { ErrorIndicator } from '../error-indicator/error-indicator';
import { Loader } from '../loader/loader';

// helpers;
import { LoadingState } from '../../store/slices/users-slice';

// hooks;
import { useAppSelector, useAppDispatch } from '../../store/hooks/common';

// redux;
import { getRepositories } from '../../store/slices/repositories-slice';

// styles;
import './repository-list.scss';

export const RepositoryList = () => {
  const dispatch = useAppDispatch();

  const {
    entities: repositories,
    loading,
    error,
  } = useAppSelector((state) => state.repositories);

  const { login } = useParams();

  useEffect(() => {
    if (login) {
      dispatch(getRepositories(login));
    }
  }, []);

  return (
    <div className='repository-list-wrapper'>
      {error && <ErrorIndicator errorMessage='Something went wrong' />}
      {loading === LoadingState.LOADING && error === null && <Loader />}
      {repositories.length === 0 && error === null
        ? loading === LoadingState.IDLE && <RepositoryListEmpty />
        : loading === LoadingState.IDLE && (
            <ul className='repository-list'>
              {repositories.map((repository) => {
                return <RepositoryItem key={repository.id} {...repository} />;
              })}
            </ul>
          )}
    </div>
  );
};
