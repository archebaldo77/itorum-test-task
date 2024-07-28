// styles;
import './error-indicator.scss';

interface ErrorIndicatorProps {
  errorMessage: string;
}

export const ErrorIndicator = (props: ErrorIndicatorProps) => {
  const { errorMessage = `Something went wrong` } = props;

  return <section className='error-indicator'>{errorMessage}</section>;
};
