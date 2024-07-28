// libraries;
import { Link } from 'react-router-dom';

// hooks;
import { useAppDispatch } from '../../store/hooks/common';

// redux;
import { reset } from '../../store/slices/users-slice';

// helpers;
import { PagePath } from '../../helpers/const';

// styles;
import './footer.scss';

export const Footer = () => {
  const dispatch = useAppDispatch();

  return (
    <footer className='footer'>
      <Link
        to={PagePath.MAIN}
        className='footer__logo'
        onClick={() => dispatch(reset())}
      >
        ItorumTestTask
      </Link>
      <p className='footer__copyright'>
        &copy; / Copyright: Andrey Zakharov / 2024
      </p>
    </footer>
  );
};
