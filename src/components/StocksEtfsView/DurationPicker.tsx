import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { StyledDurationPicker } from '../styles';
import { ViewDurationType } from '../../models/stocksEtfs';
import { STOCK_ETF_VIEW_DURATIONS } from '../../utils/constants';

interface IProps {
  value: ViewDurationType;
  onChange(newValue: ViewDurationType): void;
}

function DurationPicker({ value, onChange }: IProps) {
  function handleChange(
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: ViewDurationType | null
  ) {
    if (newValue !== null) {
      onChange(newValue);
    }
  }

  return (
    <StyledDurationPicker>
      <ToggleButtonGroup value={value} exclusive onChange={handleChange} color="primary">
        {STOCK_ETF_VIEW_DURATIONS.map((duration) => (
          <ToggleButton key={duration} value={duration}>
            {duration}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </StyledDurationPicker>
  );
}

export default DurationPicker;
