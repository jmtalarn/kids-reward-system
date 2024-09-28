import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { useIntl } from 'react-intl';

export const ErrorPage = () => {
  const error = useRouteError();
  const intl = useIntl();
  console.error(error);
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = intl.formatMessage({ defaultMessage: 'Unknown error' });
  }
  return (
    <div>
      <h3>{intl.formatMessage({ defaultMessage: 'Ooops! Some error happened!' })}</h3>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default Error;
