import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import { StyledAppBar, LogoutButton } from '../styles';
import { logout } from '../../utils/helpers';

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
  return (
    <>
      <ElevationScroll>
        <StyledAppBar position="fixed" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <MuiLink component={Link} to="/" underline="none" color="inherit">
                The Stocks
              </MuiLink>
            </Typography>
            <LogoutButton endIcon={<LogoutIcon />} onClick={logout}>
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
