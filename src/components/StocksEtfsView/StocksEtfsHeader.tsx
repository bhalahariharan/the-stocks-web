import { StyledStocksEtfsHeader } from '../styles';
import { StockEtfDetails, ViewDurationType } from '../../models/stocksEtfs';
import { isNegative } from '../../utils/helpers';

interface IProps {
  stockEtfDetails: StockEtfDetails;
  viewDuration: ViewDurationType;
}

function StocksEtfsHeader({ stockEtfDetails, viewDuration }: IProps) {
  const { company, currentPrice, changeInValue, changeInPercentage, standardDeviation } =
    stockEtfDetails;

  function renderDayChange() {
    const isProfit = !isNegative(changeInValue);
    const className = changeInValue !== 0 ? (isProfit ? 'profit' : 'loss') : '';
    const sd = standardDeviation !== null ? <span> | SD: {standardDeviation}</span> : null;
    const dayChange = `${isProfit ? '+' : '-'} $${Math.abs(changeInValue).toFixed(2)} (${Math.abs(
      changeInPercentage
    )}%)`;

    return (
      <h4 className={`returns ${className}`}>
        {dayChange}
        <div className="duration-sd-container">
          <span>{viewDuration}</span> {sd}
        </div>
      </h4>
    );
  }

  return (
    <StyledStocksEtfsHeader>
      <div>
        <h2 className="company-name">{company.name}</h2>
        <h4 className="company-symbol">{company.symbol}</h4>
      </div>
      <div className="price-container">
        <h2 className="current-price">{`$${(currentPrice || 0).toFixed(2)}`}</h2>
        {renderDayChange()}
      </div>
    </StyledStocksEtfsHeader>
  );
}

export default StocksEtfsHeader;
