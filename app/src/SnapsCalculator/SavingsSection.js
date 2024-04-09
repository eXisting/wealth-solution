import React from "react";
import styled, { css } from "styled-components";
import NumbericSnaps from "./NumbericSnaps";

const SavingsSection = ({
  age,
  monthlyCallback,
  yearsCallback,
  min,
  symbolsCountMax,
  customFormula,
  interval,
  initialSavingsValue,
}) => {
  return (
    <Container>
      <HorizontalStack>
        <VerticalStack align="flex-start">
          <Label># of years?</Label>
          <NumbericSnaps
            callback={yearsCallback}
            min={0}
            max={60}
            interval={5}
            initialValue={age}
            inputFieldHeight={"4vh"}
            inputFieldWidth={"6vh"}
            maxLength={2}
          />
        </VerticalStack>
        <VerticalStack align="flex-start">
          <Label>Average Monthly savings</Label>
          <NumbericSnaps
            callback={monthlyCallback}
            min={min}
            interval={interval}
            sign={"$"}
            initialValue={initialSavingsValue}
            inputFieldHeight={"4vh"}
            inputFieldWidth={"14vh"}
            maxLength={symbolsCountMax}
            custom={customFormula}
          />
        </VerticalStack>
      </HorizontalStack>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Tahoma;
  font-style: normal;
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align || "center"};
  justify-content: center;
  margin-top: 1vh;

  > *:not(:last-child) {
    margin-bottom: ${(props) => props.space};
  }
`;

const HorizontalStack = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
  align-items: flex-start; /* Adjust alignment */
  justify-content: center;
  gap: 1vh;
`;

const Label = styled.span`
  color: gray;
  font-size: 2vh;
  text-align: center;
  width: 100%; /* Center-align the label text */
`;

export default SavingsSection;
