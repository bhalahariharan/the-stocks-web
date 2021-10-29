import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import AppLayout from './components/AppLayout';
import Home from './components/Home';
import StocksEtfsView from './components/StocksEtfsView/StocksEtfsView';
import StartUpLoader from './components/StartUpLoader';
import ErrorPage from './components/ErrorPage';

import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  selectUser,
  selectIsAuthenticated,
  selectLoading,
  fetchCurrentUser,
} from './app/slices/auth-slice';
import localStorage from './utils/local-storage';

function PrivateRoutes() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { currentUser: isLoading } = useAppSelector(selectLoading);
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(false);

  async function fetchCurrentUserDetails() {
    try {
      await dispatch(fetchCurrentUser()).unwrap();
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    if (!localStorage.hasAccessToken()) {
      return history.replace('/authwall');
    }
    if (!['/authwall'].includes(location.pathname) && !isAuthenticated) {
      if (!isLoading) {
        fetchCurrentUserDetails();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthenticated]);

  if (isLoading) {
    return <StartUpLoader />;
  } else if (error) {
    return <ErrorPage />;
  }

  if (!isAuthenticated) {
    return null;
  }
  if (!user) {
    return <Redirect to={{ pathname: '/authwall' }} />;
  }

  return (
    <Route exact path={['/', '/stocks', '/etfs', '/stocks/:symbol', '/etfs/:symbol']}>
      <AppLayout>
        <>
          <Route exact path="/">
            <Redirect to="/stocks" />
          </Route>
          <Route exact path={['/stocks/:symbol', '/etfs/:symbol']}>
            <StocksEtfsView />
          </Route>
          <Route exact path={['/stocks', '/etfs']}>
            <Home />
          </Route>
        </>
      </AppLayout>
    </Route>
  );
}

export default PrivateRoutes;
