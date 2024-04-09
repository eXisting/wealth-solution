import React, { Component } from "react";
import styled, { css } from "styled-components";
import SliderWithSnaps from "./SliderWithSnaps";

const SavingsSection = ({step, age, totalAmount, monthlyCallback, yearsCallback, min, max, interval, initialAgeValue, initialSavingsValue}) => {
  return (
    <Container>
      <NumberOfYears>Number of years in <b>Step {step}</b></NumberOfYears>
      <SliderWithSnaps 
          callback={yearsCallback} 
          min={0} 
          max={20} 
          interval={5}
          initialValue={initialAgeValue}
        />
      <CurrentSavings>What is your monthly savings?</CurrentSavings>
      <SliderWithSnaps
        callback={monthlyCallback} 
        min={min} 
        max={max} 
        interval={interval}
        sign={'$'}
        initialValue={initialSavingsValue}
      />
      <SpanContainer>
        <span>
          You are <b>{age}</b> and you saved <b>${totalAmount}</b>!
        </span>
      </SpanContainer>
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
color: white;
font-size: 2vh;
padding-top: 3vh;
padding-bottom: 0.5vh;
text-align: center;
display: flex;
align-items: center;
justify-content: center;

  > b {
    font-weight: bold;
  }
`;

const NumberOfYears = styled.span`
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 100vw;
  text-align: center;
  font-size: 1.8vh; /* Adjust the value as needed */
  display: block;
  margin-top: 0.5vh; /* Adjust the value as needed */

  /* Styles for "Step" */
  > b {
    font-weight: bold;
    color: #21759f;
  }
`;

const CurrentSavings = styled.span`
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 100vw;
  text-align: center;
  font-size: 1.8vh; /* Adjust the value as needed */
  display: block;
  margin-top: 2.5vh; /* Adjust the value as needed */
`;

export default SavingsSection;
