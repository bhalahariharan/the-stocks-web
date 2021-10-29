import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';

import { AuthWallContainer as Container, StyledLinearProgress } from './styles';
import PinInput from './PinInput/PinInput';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, selectLoading } from '../app/slices/auth-slice';
import localStorage from '../utils/local-storage';

function AuthWall() {
  const dispatch = useAppDispatch();
  const { replace } = useHistory();
  const { login: isLoading } = useAppSelector(selectLoading);
  const [pin, setPin] = useState('');

  useEffect(() => {
    async function initiateLogin() {
      if (pin.length === 4) {
        try {
          await dispatch(login(pin)).unwrap();
          replace('/stocks');
        } catch (error) {
          setPin('');
        }
      }
    }
    initiateLogin();
  }, [dispatch, pin, replace]);

  function handlePinChange(newPin: string) {
    setPin(newPin);
  }

  if (localStorage.hasAccessToken()) {
    return <Redirect to="/stocks" />;
  }

  return (
    <Container>
      <h1 className="title">The Stocks</h1>
      <Paper elevation={0} className="paper">
        <StyledLinearProgress>
          {isLoading && <LinearProgress variant="indeterminate" />}
        </StyledLinearProgress>
        <h2>👋🏻 Hello, Guest</h2>
        <PinInput value={pin} disabled={isLoading} onChange={handlePinChange} />
        <h3>Enter PIN to continue</h3>
        <p className="hint">Hint: Use 1234 or 5678</p>
      </Paper>
    </Container>
  );
}

export default AuthWall;
