import React, { useState } from "react";
import styled, { css } from "styled-components";
import NumbericSnaps from "./NumbericSnaps";
import { Switch } from 'antd';

const SavingsSection = ({age, monthlyCallback, yearsCallback, min, symbolsCountMax, customFormula, interval, initialSavingsValue, stageNumber, toggleCallback}) => {
  
  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = (value, mouse) => {
    setIsChecked(value);
    toggleCallback(value);
  };

  return (
    <Container>
      <SpanContainer>
        <span style={{fontSize:"2.5vh"}}>
          Your {stageNumber} life savings stage 
        </span>
        <Switch 
          checked={isChecked}
          onChange={handleToggle} 
          style={{ marginLeft:"2vh", background: isChecked ? '#0BDA51' : 'gray' }}
        />
      </SpanContainer>
      <HorizontalStack space="2vh">
        <VerticalStack>
          <span style={{ color: "gray",fontSize: '2vh', textAlign: 'center'}}># of years?</span>
          <NumbericSnaps
            callback={yearsCallback} 
            min={0} 
            max={50}
            interval={5}
            initialValue={age}
            inputFieldHeight={"4vh"}
            inputFieldWidth={"6vh"}
            maxLength={2}
          />
        </VerticalStack>
        <VerticalStack>
          <span style={{ color: "gray", fontSize: '2vh', textAlign: 'center'}}>Average Monthly savings</span>
          <NumbericSnaps
            callback={monthlyCallback} 
            min={min} 
            interval={interval}
            sign={'$'}
            initialValue={initialSavingsValue}
            inputFieldHeight={"4vh"}
            inputFieldWidth={"16vh"}
            maxLength={symbolsCountMax}
            custom={customFormula}
          />
        </VerticalStack>
      </HorizontalStack>
    </Container>
  );
}

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Tahoma;
  font-style: normal;
`;

const SpanContainer = styled.div`
font-size: 2vh;
text-align: center;
height: 4vh;
display: flex;
align-items: center;
justify-content: center;

  > b {
    font-weight: bold;
  }
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "center"};
  justify-content: center;
  margin-top: 1vh;

  > *:not(:last-child) {
    margin-bottom: ${props => props.space};
  }
`;

const HorizontalStack = styled.div`
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: center; /* Updated value */
`;

export default SavingsSection;
