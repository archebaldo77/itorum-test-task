// libraries;
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// components;
import { Loader } from '../loader/loader';
import { ErrorIndicator } from '../error-indicator/error-indicator';

// helpers;
import { LoadingState } from '../../store/slices/users-slice';

// hooks;
import { useAppDispatch, useAppSelector } from '../../store/hooks/common';

// redux;
import { getCurrentUser } from '../../store/slices/current-user-slice';

// styles;
import './profile-details-card.scss';

export const ProfileDetailsCard = () => {
  const dispatch = useAppDispatch();

  const { login } = useParams();

  useEffect(() => {
    if (login) {
      dispatch(getCurrentUser(login));
    }
  }, []);

  const {
    data: { login: userLogin, name, avatarUrl, htmlUrl },
    loading,
    error,
  } = useAppSelector((state) => state.currentUser);

  return (
    <div className='profile-details-card'>
      {error && <ErrorIndicator errorMessage='Something went wrong' />}
      {loading === LoadingState.LOADING && error === null && <Loader />}
      {loading === LoadingState.IDLE && error === null && (
        <>
          <div className='profile-details-card__avatar'>
            <img src={avatarUrl || ``} alt='user-avatar' />
          </div>
          <div className='profile-details-card__content'>
            <p className='profile-details-card__login'>{userLogin}</p>
            <p className='profile-details-card__name'>{name}</p>
            <a
              href={htmlUrl || ``}
              target='__blank'
              className='profile-details-card__link'
            >
              Github
            </a>
          </div>
        </>
      )}
    </div>
  );
};
