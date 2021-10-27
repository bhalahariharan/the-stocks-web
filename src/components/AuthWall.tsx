import { useState } from 'react';
import Paper from '@mui/material/Paper';

import { AuthWallContainer as Container } from './styles';
import PinInput from './PinInput/PinInput';

function AuthWall() {
  const [pin, setPin] = useState('');

  function handlePinChange(newPin: string) {
    setPin(newPin);
  }

  return (
    <Container>
      <h1 className="title">The Stocks</h1>
      <Paper elevation={0} className="paper">
        <h2>👋🏻 Hello, Guest</h2>
        <PinInput value={pin} onChange={handlePinChange} />
        <h3>Enter PIN to continue</h3>
        <p className="hint">Hint: Use 1234 or 5678</p>
      </Paper>
    </Container>
  );
}

export default AuthWall;
