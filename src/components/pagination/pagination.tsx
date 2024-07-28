// libraries;
import { useSearchParams } from 'react-router-dom';

// hooks;
import { useAppDispatch, useAppSelector } from '../../store/hooks/common';

// redux;
import { getUsers, LoadingState } from '../../store/slices/users-slice';

// helpers;
import { SearchParam } from '../../helpers/const';

// styles;
import './pagination.scss';

interface PaginationProps {
  maxPages: number;
}

export const Pagination = (props: PaginationProps) => {
  const dispatch = useAppDispatch();

  const { maxPages } = props;

  const { loading } = useAppSelector((state) => state.users);

  const [searchParams, setSearchParams] = useSearchParams();

  const login = String(searchParams.get(SearchParam.LOGIN));
  const page = Number(searchParams.get(SearchParam.PAGE));

  return (
    <div className='pagination'>
      <button
        className='pagination__button pagination__button--prev'
        onClick={() => {
          if (page <= 1) {
            return;
          }

          const updatedPage = page - 1;

          setSearchParams(`login=${login}&page=${updatedPage}`);
          dispatch(getUsers({ login, page: updatedPage }));
        }}
        disabled={Number(page) <= 1 || loading === LoadingState.LOADING}
      >
        Prev
      </button>
      <button
        className='pagination__button pagination__button--next'
        onClick={() => {
          if (page >= maxPages) {
            return;
          }

          const updatedPage = page <= 0 ? 2 : page + 1;

          setSearchParams(`login=${login}&page=${updatedPage}`);
          dispatch(getUsers({ login, page: updatedPage }));
        }}
        disabled={page >= maxPages || loading === LoadingState.LOADING}
      >
        Next
      </button>
    </div>
  );
};
