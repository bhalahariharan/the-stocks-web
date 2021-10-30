import CircularProgress from '@mui/material/CircularProgress';

import { StartUpLoaderContainer } from '../styles';

function StartUpLoader() {
  return (
    <StartUpLoaderContainer>
      <CircularProgress color="inherit" /> <span className="label">Loading. Please wait.</span>
    </StartUpLoaderContainer>
  );
}

export default StartUpLoader;
