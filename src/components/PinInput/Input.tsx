import React, { useEffect, useRef } from 'react';

import { StyledPinInput } from '../styles';

import { REGEX } from '../../constants';

interface IProps {
  value: string;
  shouldFocus: boolean;
  position: number;
  disabled: boolean;
  onChange(value: string, position: number): void;
  onKeyDown(event: React.KeyboardEvent<HTMLInputElement>, position: number): void;
  onFocus(position: number): void;
}

function Input({ value, shouldFocus, position, disabled, onChange, onKeyDown, onFocus }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value !== '') {
      if (!REGEX.NUMBERS.test(value)) {
        return;
      }
    }
    onChange(value, position);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    onKeyDown(event, position);
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement, Element>) {
    event.target.select();
    onFocus(position);
  }

  return (
    <StyledPinInput
      ref={inputRef}
      type="password"
      value={value}
      disabled={disabled}
      maxLength={1}
      autoComplete="off"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
    />
  );
}

export default Input;
