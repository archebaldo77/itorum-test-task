// components;
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

// types;
import { type ReactNode } from 'react';

// styles;
import './page-container.scss';

interface PageContainerProps {
  children: ReactNode;
  isMainPage?: boolean;
}

export const PageContainer = (props: PageContainerProps) => {
  const { children, isMainPage = false } = props;

  return (
    <div className='page-container'>
      <Header isMainPage={isMainPage} />
      {children}
      <Footer />
    </div>
  );
};
