import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import styled from '@emotion/styled';

export const CenteredContainer = styled.div`
  align-items: center;
  background-color: #232238;
  display: flex;
  height: 100vh;
  justify-content: center;
  color: #dfdfdf;
`;

export const StartUpLoaderContainer = styled(CenteredContainer)`
  .label {
    margin-left: 16px;
  }
`;

export const AuthWallContainer = styled.div`
  align-items: center;
  background-color: #232238;
  display: flex;
  flex-direction: column;
  height: 100vh;

  .title {
    color: #dfdfdf;
    margin-top: 15vh;
  }
  .paper {
    width: 100%;
    max-width: 400px;
    text-align: center;
    color: #545351;
    background-color: #faf0e4;
  }
  .hint {
    font-size: 12px;
  }
`;

export const StyledPinInput = styled.input`
  width: 3rem;
  height: 3rem;
  margin: 0 1rem;
  font-size: 2rem;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
`;

export const StyledAppBar = styled(AppBar)`
  color: #333333;
  background-color: #ffffff;
`;

export const LogoutButton = styled(Button)`
  color: #ee6659;
  &:hover {
    background-color: #ffd0c8;
  }
`;
