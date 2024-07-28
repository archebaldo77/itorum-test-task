// libraries;
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// hooks;
import { useAppDispatch } from '../../store/hooks/common';

// redux;
import { reset } from '../../store/slices/users-slice';
import { getUsers } from '../../store/slices/users-slice';

// helpers;
import { SearchParam } from '../../helpers/const';

// styles;
import './search-form.scss';

export const SearchForm = () => {
  const dispatch = useAppDispatch();

  const [currentSearchValue, setCurrentSearchValue] = useState<string>(``);
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmitForm = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    dispatch(getUsers({ login: currentSearchValue, page: 1 }));
    setSearchParams(
      () => `${SearchParam.LOGIN}=${currentSearchValue}&${SearchParam.PAGE}=1`
    );
  };

  useEffect(() => {
    if (
      searchParams.get(SearchParam.LOGIN) &&
      searchParams.get(SearchParam.PAGE)
    ) {
      setCurrentSearchValue(String(searchParams.get(SearchParam.LOGIN)));
    }
  }, []);

  return (
    <form className='search-form' onSubmit={onSubmitForm}>
      <input
        type='text'
        className='search-form__input'
        value={currentSearchValue}
        onChange={(e) => {
          setCurrentSearchValue(e.target.value);
        }}
      />
      <div className='search-form__controls'>
        <button
          className='search-form__button search-form__button--search'
          disabled={currentSearchValue.trim() === ``}
          onClick={onSubmitForm}
        >
          Search
        </button>
        <button
          className='search-form__button search-form__button--reset'
          onClick={(e) => {
            e.preventDefault();

            setSearchParams(``);
            dispatch(reset());
            setCurrentSearchValue(``);
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};
