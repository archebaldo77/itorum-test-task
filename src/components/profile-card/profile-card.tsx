import { Link } from 'react-router-dom';

// types;
import { type UsersUiType } from '../../types/response-from-server/users';

// styles;
import './profile-card.scss';

export const ProfileCard = (props: UsersUiType) => {
  const { login, avatarUrl, type } = props;

  return (
    <li className='profile-card'>
      <Link to={`details/${login || ``}`} className='profile-card__link'>
        <div className='profile-card__avatar'>
          <img src={avatarUrl} alt='user-avatar' />
        </div>
        <p className='profile-card__login'>{login}</p>
        <p className='profile-card__type'>Type: {type}</p>
      </Link>
    </li>
  );
};
