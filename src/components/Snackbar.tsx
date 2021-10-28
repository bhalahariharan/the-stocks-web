import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { hideSnackbar, selectSnackbar } from '../app/slices/snackbar-slice';

function Snackbar() {
  const { open, severity, message } = useAppSelector(selectSnackbar);
  const dispatch = useAppDispatch();

  function handleHideSnackbar(event?: React.SyntheticEvent, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideSnackbar());
  }

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleHideSnackbar}
    >
      <Alert elevation={6} variant="filled" severity={severity} onClose={handleHideSnackbar}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}

export default Snackbar;
