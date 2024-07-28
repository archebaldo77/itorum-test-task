// components;
import { ProfileCard } from '../profile-card/profile-card';

// types;
import { type UsersUiType } from '../../types/response-from-server/users';

// styles;
import './profile-list.scss';

interface ProfileListProps {
  users: UsersUiType[];
}

export const ProfileList = (props: ProfileListProps) => {
  const { users } = props;

  return (
    <ul className='profile-list'>
      {users.map((props) => (
        <ProfileCard key={props.id} {...props} />
      ))}
    </ul>
  );
};
