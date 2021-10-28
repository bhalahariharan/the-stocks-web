import React, { useState } from 'react';

import Input from './Input';

import { PIN_LENGTH } from '../../constants';

interface IProps {
  value: string;
  disabled: boolean;
  onChange(pin: string): void;
}

function PinInput({ value, disabled, onChange }: IProps) {
  const [activeInputPosition, setActiveInputPosition] = useState<number | null>(0);

  function handleChange(newValue: string, position: number) {
    const splittedPin = value.split('');
    splittedPin[position] = newValue;
    const pin = splittedPin.join('');
    if (pin.length <= PIN_LENGTH) {
      onChange(pin);
      if (newValue) {
        setActiveInputPosition(position + 1);
      }
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>, position: number) {
    if (!value[position] && event.key === 'Backspace' && position - 1 >= 0) {
      setActiveInputPosition(position - 1);
    } else if (position !== 0 && event.key === 'ArrowLeft') {
      setActiveInputPosition(position - 1);
    } else if (position !== PIN_LENGTH - 1 && event.key === 'ArrowRight') {
      setActiveInputPosition(position + 1);
    }
  }

  function handleFocus(position: number) {
    setActiveInputPosition(position);
  }

  function getShouldFocus(index: number) {
    if (activeInputPosition === null) return false;
    return index === activeInputPosition;
  }

  return (
    <>
      {Array(PIN_LENGTH)
        .fill(0)
        .map((_, i) => (
          <Input
            key={i}
            position={i}
            value={value[i] || ''}
            disabled={disabled}
            shouldFocus={getShouldFocus(i)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
          />
        ))}
    </>
  );
}

export default PinInput;
