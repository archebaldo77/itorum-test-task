// libraries;
import { Link } from 'react-router-dom';

// components;
import { SearchForm } from '../search-form/search-form';

// hooks;
import { useAppDispatch } from '../../store/hooks/common';

// redux;
import { reset } from '../../store/slices/users-slice';

// helpers;
import { PagePath } from '../../helpers/const';

// styles;
import './header.scss';

interface HeaderProps {
  isMainPage?: boolean;
}

export const Header = (props: HeaderProps) => {
  const { isMainPage = false } = props;

  const dispatch = useAppDispatch();

  return (
    <header className='header'>
      <Link
        to={PagePath.MAIN}
        className='header__logo'
        onClick={() => dispatch(reset())}
      >
        ItorumTestTask
      </Link>
      {isMainPage && <SearchForm />}
    </header>
  );
};
