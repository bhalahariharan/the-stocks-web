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

export const StyledStocksEtfsTableContainer = styled.div<{ clickableRow?: boolean }>`
  .table {
    height: calc(100vh - 250px) !important;
  }
  .row {
    cursor: ${(props) => (props.clickableRow ? 'pointer' : 'normal')};
  }
`;

export const StyledLinearProgress = styled.div`
  min-height: 4px;
`;

export const StyledStocksEtfsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: #333333;

  .company-name,
  .current-price {
    margin-bottom: 4px;
  }
  .company-symbol,
  .returns {
    color: #7c7e8c;
    margin-top: 4px;
  }
  .returns.profit {
    color: #0abb92;
  }
  .returns.loss {
    color: #eb5b3c;
  }
  .duration-sd-container {
    font-size: 14px;
    margin-top: 4px;
    color: #7c7e8c;
  }
  .price-container {
    min-width: 200px;
  }
`;

export const StyledDurationPicker = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

export const StocksEtfsChartContainer = styled.div`
  width: 100%;
  height: 500px;
`;
