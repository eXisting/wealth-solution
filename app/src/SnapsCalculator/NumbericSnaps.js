import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";


const NumbericSnaps = ({ callback, min, max, interval, sign, initialValue, maxLength, custom, signAtTheEnd, 
  disableControls, inputFieldWidth, inputFieldHeight }) => {
  const [value, setValue] = useState(initialValue);

  const processInput = (inputValue) => {
    let numericValue = inputValue.replace(/[^0-9]/g, '');
  
    // Parse numericValue as a number
    let parsedValue = Number(numericValue);
  
    // Check if parsedValue is within the min and max boundaries
    if (parsedValue < min) {
      parsedValue = min.toString();
    } else if (parsedValue > max) {
      parsedValue = max.toString();
    }
  
    handleInputChange(parsedValue.toString());
  };  

  const resetValueOnFocus = () => {
    setValue('');
  };
  
  const handleBlur = () => {
    if (value === '') {
      setValue('0');
      callback('0');
    } else {
      setValue(value);
      callback(value);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const formatCurrency = (numericValue) => {
    if (sign === undefined) return numericValue;
    if (signAtTheEnd) return `${numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${sign}`;
    return `${sign}${numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const handleInputChange = (parsedValue) => {
    setValue(parsedValue);
    callback(parsedValue);
  };

  const increment = () => {
    if (custom) {
      const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const parsedValue = Number(numericValue);
      const newValue = parsedValue + Number(interval);

      if (max === undefined || newValue <= max) {
        const formattedValue = formatCurrency(newValue.toString());
        
        if (formattedValue.length > maxLength)
          return;

        processInput(formattedValue);
      }
      return;
    }
  
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      const newValue = parsedValue + interval;
  
      if (newValue <= max) {
        handleInputChange(newValue);
      }
    }
  };

  const decrement = () => {
    if (custom) {
      const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const parsedValue = Number(numericValue);
      const newValue = parsedValue - Number(interval);
  
      if (newValue >= min) {
        const formattedValue = formatCurrency(newValue.toString());
        processInput(formattedValue);
      }
      return;
    }
  
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      const newValue = parsedValue - interval;
  
      if (newValue >= min) {
        handleInputChange(newValue);
      }
    }
  };

  return (
    <HorizontalStack space={"1vh"}>
      {!disableControls && 
        <StyledButton 
          onClick={decrement}>
          -
        </StyledButton>}
        <StyledInput 
          maxLength={maxLength}
          width={inputFieldWidth}
          height={inputFieldHeight}
          type="text"
          value={value}
          onInput={e => processInput(e.target.value)}
          onFocus={resetValueOnFocus}
          onBlur={handleBlur}
        />
      {!disableControls && 
        <StyledButton 
          onClick={increment}>
          +
        </StyledButton>}
      </HorizontalStack>
  );
};

const StyledInput = styled.input`
  font-family: Tahoma;
  font-style: normal;
  color: rgba(0, 0, 0, 1);
  font-size: 3vh;
  background-color: white;
  text-align: center;
  border-width: 0px;
  margin-top: 0;
  width: ${props => props.width ? props.width : '20vh'};
  height: ${props => props.height ? props.height : '6vh'};
  border-radius: 0.5vh;
  border: 0.2vh solid #000000;
`;

const StyledButton = styled.button`
  font-family: Tahoma;
  font-style: normal;
  font-weight: 400;
  color: white;
  font-size: 3vh;
  background-color: #0476bb;
  text-align: center;
  border-width: 0px;
  border-radius: 2vh;
  margin-top: 0;
  
  width: ${props => props.width ? props.width : '4vh'};
  height: ${props => props.height ? props.height : '4vh'};
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: white;
    color: white;
  }
`;

const HorizontalStack = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5vh;

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: center; /* Updated value */
`;

export default NumbericSnaps;
