import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';

import StocksEtfsHeader from './StocksEtfsHeader';
import StocksEtfsChart from './StocksEtfsChart';
import DurationPicker from './DurationPicker';
import PageTitleWithBack from '../shared/PageTitleWithBack';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchStockEtfDetails,
  selectActiveStockEtfDetails,
  selectActiveViewDuration,
  selectAllDurationStockEtfDetails,
  selectLoading,
  setActiveViewDuration,
} from '../../app/slices/stocks-etfs-slice';
import { ViewDurationType } from '../../models/stocksEtfs';
import { StyledLinearProgress } from '../styles';

function StocksEtfsView() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const params = useParams<{ symbol: string }>();
  const { stockEtfDetails: isLoading } = useAppSelector(selectLoading);
  const activeViewDuration = useAppSelector(selectActiveViewDuration);
  const activeStockEtfDetails = useAppSelector(selectActiveStockEtfDetails);
  const allDurationStockEtfDetails = useAppSelector(selectAllDurationStockEtfDetails);

  useEffect(() => {
    if (!allDurationStockEtfDetails[activeViewDuration]) {
      dispatch(
        fetchStockEtfDetails({
          equityType: isStock() ? 'STOCK' : 'ETF',
          duration: activeViewDuration,
          symbol: params.symbol,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeViewDuration, dispatch, allDurationStockEtfDetails]);

  function isStock() {
    return history.location.pathname.includes('stocks');
  }

  function handleBack() {
    const path = isStock() ? '/stocks' : '/etfs';
    history.replace(path);
  }

  function handleViewDurationChange(value: ViewDurationType) {
    if (activeViewDuration !== value) {
      dispatch(setActiveViewDuration(value));
    }
  }

  return (
    <Container maxWidth="lg">
      <PageTitleWithBack
        title={`Back to ${isStock() ? 'Stocks' : 'ETFs'}`}
        onBackClick={handleBack}
      />
      <StocksEtfsHeader stockEtfDetails={activeStockEtfDetails} viewDuration={activeViewDuration} />
      <StyledLinearProgress>
        {isLoading && <LinearProgress variant="indeterminate" />}
      </StyledLinearProgress>
      <StocksEtfsChart data={activeStockEtfDetails.data} />
      <DurationPicker value={activeViewDuration} onChange={handleViewDurationChange} />
    </Container>
  );
}

export default StocksEtfsView;
