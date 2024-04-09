import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";


const NumbericSnaps = ({ callback, min, max, interval, sign, initialValue, maxLength, custom, signAtTheEnd, 
  disableControls, inputFieldWidth, inputFieldHeight, textSize, colorScheme, readOnly }) => {
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
          <span style={{ fontSize: "2.5vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            -
          </span>
        </StyledButton>}
        <StyledInput 
          maxLength={maxLength}
          width={inputFieldWidth}
          height={inputFieldHeight}
          type="text"
          fontSize={textSize}
          scheme={colorScheme}
          value={formatCurrency(value)}
          onInput={e => processInput(e.target.value)}
          onFocus={resetValueOnFocus}
          onBlur={handleBlur}
          readOnlyInput={readOnly}
        />
      {!disableControls && 
        <StyledButton 
          onClick={increment}>
          <span style={{ fontSize: "2.5vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            +
          </span>
        </StyledButton>}
      </HorizontalStack>
  );
};

const StyledInput = styled.input`
  font-family: Tahoma;
  font-style: normal;
  color: ${props => props.scheme ? props.scheme : "#000000"};
  font-size: ${props => props.fontSize ? props.fontSize : "3vh"};
  background-color: white;
  text-align: center;
  border-width: 0px;
  margin-top: 0;
  width: ${props => props.width ? props.width : '20vh'};
  height: ${props => props.height ? props.height : '6vh'};
  border-radius: 0.5vh;
  border: 0.2vh solid ${props => props.scheme ? props.scheme : "#000000"};
  ${props =>
    props.readOnlyInput &&
    css`
      pointer-events: none;
    `}
`;

const StyledButton = styled.button`
  font-family: Tahoma;
  font-style: normal;
  font-weight: 400;
  color: white;
  background-color: #0476bb;
  border-width: 0px;
  margin-top: 0;
  width: 4vh;
  height: 4vh;
  border-radius: 50%; /* Make it a circle */
  

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
