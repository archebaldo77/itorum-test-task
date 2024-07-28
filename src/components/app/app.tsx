// libraries;
import { Routes, Route } from 'react-router-dom';

// pages;
import { Main } from '../../pages/main/main';
import { Details } from '../../pages/details/details';
import { NotFound } from '../../pages/not-found/not-found';

// components;
import { PageContainer } from '../page-container/page-container';

// helpers;
import { PagePath } from '../../helpers/const';

export const App = () => {
  return (
    <Routes>
      <Route
        path={PagePath.MAIN}
        element={
          <PageContainer isMainPage={true}>
            <Main />
          </PageContainer>
        }
      />
      <Route
        path={PagePath.DETAILS}
        element={
          <PageContainer>
            <Details />
          </PageContainer>
        }
      />
      <Route
        path={PagePath.NOT_FOUND}
        element={
          <PageContainer>
            <NotFound />
          </PageContainer>
        }
      />
    </Routes>
  );
};
