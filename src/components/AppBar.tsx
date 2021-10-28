import React from 'react';
import { useHistory } from 'react-router';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import { useAppDispatch } from '../app/hooks';
import { StyledAppBar, LogoutButton } from './styles';

import { logout } from '../app/slices/auth-slice';

function ElevationScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 3 : 0,
  });
}

function AppBar() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  function handleLogout() {
    dispatch(logout());
    history.push('/authwall');
  }

  return (
    <>
      <ElevationScroll>
        <StyledAppBar position="fixed" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              The Stocks
            </Typography>
            <LogoutButton endIcon={<LogoutIcon />} onClick={handleLogout}>
              Logout
            </LogoutButton>
          </Toolbar>
        </StyledAppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
}

export default AppBar;