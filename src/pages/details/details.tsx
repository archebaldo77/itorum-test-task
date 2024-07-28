// components;
import { ProfileDetailsCard } from '../../components/profile-details-card/profile-details-card';
import { RepositoryList } from '../../components/repository-list/repository-list';

// styles;
import './details.scss';

export const Details = () => {
  return (
    <main className='details-page'>
      <ProfileDetailsCard />
      <RepositoryList />
    </main>
  );
};
