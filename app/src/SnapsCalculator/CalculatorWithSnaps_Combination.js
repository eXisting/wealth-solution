import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import SavingsSection from "./SavingsSection";
import { useDispatch, useSelector } from "react-redux";
import HeaderComponent from "../Common/HeaderComponent";

import {
  updateMonthlyContribution as updateFirstDecadeMonthlyContribution,
  updateAge as updateFirstDecadeAge,
  updateTotalDecadeSavings as updateFirstDecadeTotalSavings,
  updateEnabled as updateFirstDecadeEnabled,
} from '../redux/decadeOneReducer';

import {
  updateMonthlyContribution as updateSecondDecadeMonthlyContribution,
  updateAge as updateSecondDecadeAge,
  updateTotalDecadeSavings as updateSecondDecadeTotalSavings,
  updateEnabled as updateSecondDecadeEnabled,
} from '../redux/decadeTwoReducer';

import {
  updateMonthlyContribution as updateThirdDecadeMonthlyContribution,
  updateAge as updateThirdDecadeAge,
  updateTotalDecadeSavings as updateThirdDecadeTotalSavings,
  updateEnabled as updateThirdDecadeEnabled,
} from '../redux/decadeThreeReducer';

const CalculatorWithSnapsCombination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstAgeInterval, setFirstAgeInterval] = useState(0);
  const [secondAgeInterval, setSecondAgeInterval] = useState(0);
  const [thirdAgeInterval, setThirdAgeInterval] = useState(0);

  const nextPage = () => {
    navigate(`/follow-steps`);
  };

  const {
    startingSavings,
    startingAge,
    desiredResult,
  } = useSelector(
    (state) => state.initialPage
  );
  
  const {
    monthlyContribution: decadeOneMonthlyContribution,
    age: decadeOneAge,
    totalDecadeSavings: decadeOneTotalSavings,
    enabled: decadeOneEnabled,
  } = useSelector(
    (state) => state.decadeOnePage
  );

  const {
    monthlyContribution: decadeTwoMonthlyContribution,
    age: decadeTwoAge,
    totalDecadeSavings: decadeTwoTotalSavings,
    enabled: decadeTwoEnabled,
  } = useSelector(
    (state) => state.decadeTwoPage
  );

  const {
    monthlyContribution: decadeThreeMonthlyContribution,
    age: decadeThreeAge,
    totalDecadeSavings: decadeThreeTotalSavings,
    enabled: decadeThreeEnabled,
  } = useSelector(
    (state) => state.decadeThreePage
  );

  useEffect(() => {
    dispatch(updateFirstDecadeEnabled(true));
    dispatch(updateSecondDecadeEnabled(true));
    dispatch(updateThirdDecadeEnabled(true));
  }, [])

  useEffect(() => {
    if (desiredResult && startingSavings && startingAge) {
      setSmallestCombination();
    }
  }, [desiredResult, startingSavings, decadeOneEnabled, decadeTwoEnabled, decadeThreeEnabled]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeOneMonthlyContribution, firstAgeInterval, startingSavings, updateFirstDecadeTotalSavings);
  }, [decadeOneMonthlyContribution, firstAgeInterval, startingAge, startingSavings, decadeOneEnabled]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeTwoMonthlyContribution, secondAgeInterval, decadeOneTotalSavings, updateSecondDecadeTotalSavings);
  }, [decadeTwoMonthlyContribution, secondAgeInterval, decadeOneTotalSavings, decadeTwoEnabled]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeThreeMonthlyContribution, thirdAgeInterval, decadeTwoTotalSavings, updateThirdDecadeTotalSavings);
  }, [decadeThreeMonthlyContribution, thirdAgeInterval, decadeTwoTotalSavings, decadeThreeEnabled]);

  const setSmallestCombination = () => {
    if (desiredResult <= startingSavings)
    {
      dispatch(updateFirstDecadeAge(0));
      setFirstAgeInterval(0);
      dispatch(updateFirstDecadeMonthlyContribution(0));
  
      dispatch(updateSecondDecadeAge(0));
      setSecondAgeInterval(0);
      dispatch(updateSecondDecadeMonthlyContribution(0));
  
      dispatch(updateThirdDecadeAge(0));
      setThirdAgeInterval(0);
      dispatch(updateThirdDecadeMonthlyContribution(0));

      return;
    }

    let savingPeriod = 40;

    if (startingSavings >= desiredResult * 0.01)
      savingPeriod = 20;

    let first = [0, 0];
    let calculatedInFirst = startingSavings;
    if (decadeOneEnabled) {

      let firstPeriod = decadeTwoEnabled && decadeThreeEnabled ?
        Math.floor(savingPeriod * 0.13) :
        decadeTwoEnabled ^ decadeThreeEnabled ?
        Math.floor(savingPeriod * 0.38) :
        savingPeriod;

        let firstResult = decadeTwoEnabled && decadeThreeEnabled ?
        desiredResult * 0.01 :
        decadeTwoEnabled ^ decadeThreeEnabled ?
        desiredResult * 0.05 :
        desiredResult;

      first = calculateContribution(firstResult, startingSavings, firstPeriod);
      calculatedInFirst = calculateSavings(first[1], first[0], startingSavings);
    }

    let second = [0, 0];
    let calculatedInSecond = calculatedInFirst;
    if (calculatedInFirst < desiredResult && decadeTwoEnabled){

      let secondPeriod = decadeOneEnabled && decadeThreeEnabled ?
        Math.floor(savingPeriod * 0.38) :
        decadeOneEnabled ?
        savingPeriod - first[0] :
        decadeThreeEnabled ?
        Math.floor(savingPeriod * 0.38) :
        savingPeriod;


      let secondResult = decadeOneEnabled && decadeThreeEnabled ?
        desiredResult * 0.11 :
        decadeOneEnabled ?
        desiredResult :
        decadeThreeEnabled ?
        desiredResult * 0.11 :
        desiredResult;

      second = calculateContribution(secondResult, calculatedInFirst, secondPeriod);
      calculatedInSecond = calculateSavings(second[1], second[0], calculatedInFirst);
    }

    let third = [0, 0];    
    if (calculatedInSecond < desiredResult && decadeThreeEnabled){
      let thirdPeriod = savingPeriod - first[0] - second[0];

      third = calculateContribution(desiredResult, calculatedInSecond, thirdPeriod);
    }

    dispatch(updateFirstDecadeAge(first[0]));
    setFirstAgeInterval(first[0]);
    dispatch(updateFirstDecadeMonthlyContribution(first[1]));

    dispatch(updateSecondDecadeAge(second[0]));
    setSecondAgeInterval(second[0]);
    dispatch(updateSecondDecadeMonthlyContribution(second[1]));

    dispatch(updateThirdDecadeAge(third[0]));
    setThirdAgeInterval(third[0]);
    dispatch(updateThirdDecadeMonthlyContribution(third[1]));
  };

  function calculateMinimumYearsForFutureValue(futureValue, principal, maxContribution) {
    let maxYears = 15;
    const n = 12; // Compounding frequency per year
    const r = 10 / 100; // Convert rate to decimal form

      for (let years = 1; years <= maxYears; years++) {
        const compoundTerm = Math.pow(1 + r / n, n * years);
        const contributionPart = principal * compoundTerm;

        if (contributionPart >= desiredResult) {
          return years;
        }

        if (years === maxYears) {
          maxYears ++;
        }
      }

      return 0;
  }

  function calculateContribution(futureValue, principal, maxYears) {
    const compoundingFrequency = 12;
    const annualInterest = 10 / 100;

    const compoundCoefficient = Math.pow(1 + annualInterest/compoundingFrequency, compoundingFrequency * maxYears);
    let contribution = Math.ceil((futureValue - principal * compoundCoefficient) * (annualInterest/compoundingFrequency) / (compoundCoefficient - 1));

    if (contribution <= 0)
    {
      let minYears = calculateMinimumYearsForFutureValue(desiredResult, principal, 10000);

      return [futureValue == desiredResult ? minYears : 0, 0];
    }

    return [maxYears, contribution];
  }
  
  const calculateSavings = (contribution, years, savings) => {
    if (savings === 0 && contribution === 0) {
      return 0;
    }
  
    const r = parseFloat(10) / 100;
    const n = 12;
  
    var t = years;
    var P = parseFloat(savings.toString().replace(/[^0-9]/g, ''));
  
    const futureValue = P * Math.pow(1 + (r / n), n * t) + contribution * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));
  
    return Math.round(futureValue);
  };

  const updateDecadeTotalSavings = (contribution, years, savings, updateAction) => {
    let saved = calculateSavings(contribution, years, savings);
    if (saved === 0) {
      dispatch(updateAction(0));
      return;
    }

    dispatch(updateAction(Math.round(saved).toLocaleString()));
  };

  const contributionChanged = (value, stageNumber) => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (stageNumber === 1) {
      dispatch(updateFirstDecadeMonthlyContribution(numericValue));
    } else if (stageNumber === 2) {
      dispatch(updateSecondDecadeMonthlyContribution(numericValue));
    } else if (stageNumber === 3) {
      dispatch(updateThirdDecadeMonthlyContribution(numericValue));
    }
  };

  const ageIntervalChanged = (value, stageNumber) => {
    if (stageNumber === 1) {
      setFirstAgeInterval(value);
    } else if (stageNumber === 2) {
      setSecondAgeInterval(value);
    } else if (stageNumber === 3) {
      setThirdAgeInterval(value);
    }
  };

  const changeStageEnabled = (value, stageNumber) => {
    if (stageNumber === 1) {
      dispatch(updateFirstDecadeEnabled(value));
    } else if (stageNumber === 2) {
      dispatch(updateSecondDecadeEnabled(value));
    } else if (stageNumber === 3) {
      dispatch(updateThirdDecadeEnabled(value));
    }
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton></HeaderComponent>
      <Section ignore width="85%" backgroundColor="#0476bb" style={{marginTop:"2vh", marginBottom:"2vh"}}>
        <span style={{ color: 'white', fontSize: '4vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          {"Your wealth "}
          {decadeThreeTotalSavings}
        </span>
      </Section>
      <Section ignore maxHeight={"50%"}>
        <SavingsSection
          age={decadeOneAge}
          monthlyCallback={(value) => contributionChanged(value, 1)}
          yearsCallback={(value) => ageIntervalChanged(value, 1)}
          min={0}
          symbolsCountMax={10} 
          customFormula={true}
          interval={100}
          initialSavingsValue={decadeOneMonthlyContribution}
          stageNumber={"1st"}
          toggleCallback={(value) => changeStageEnabled(value, 1)}
        />
      </Section>
      <Section ignore width="100%" style={{border:"0.1vh solid #000000", height:"0px", marginTop:"2vh"}} />
      <Section ignore align="top" maxHeight={"50%"}>
        <SavingsSection
          age={decadeTwoAge}
          monthlyCallback={(value) => contributionChanged(value, 2)}
          yearsCallback={(value) => ageIntervalChanged(value, 2)}
          min={0} 
          symbolsCountMax={10} 
          customFormula={true}
          interval={500}
          initialSavingsValue={decadeTwoMonthlyContribution}
          stageNumber={"2nd"}
          toggleCallback={(value) => changeStageEnabled(value, 2)}
          />
      </Section>
      <Section ignore width="100%" style={{border:"0.1vh solid #000000", height:"0px", marginTop:"2vh"}} />
      <Section ignore align="top" maxHeight={"50%"}>
        <SavingsSection
          age={decadeThreeAge}
          monthlyCallback={(value) => contributionChanged(value, 3)}
          yearsCallback={(value) => ageIntervalChanged(value, 3)}
          min={0} 
          symbolsCountMax={10} 
          customFormula={true}
          interval={500}
          initialSavingsValue={decadeThreeMonthlyContribution}
          stageNumber={"3rd"}
          toggleCallback={(value) => changeStageEnabled(value, 3)}
          />
      </Section>
      <Section ignore width="100%" style={{border:"0.1vh solid #000000", height:"0px", marginTop:"2vh"}} />
      <Section justify={"top"} style={{marginTop:"2vh"}}>
        <Button onClick={nextPage}>{"What is next? ->"}</Button>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: 100%;
  border: 0.2vh solid #000000;
  max-height: 100vh; /* Set the maximum height to screen height */
  overflow: auto; /* Enable scrolling when content overflows */
  margin-right: 2vw;
  font-family: Tahoma;
  font-style: normal;
`;

const Section = styled.section`
  flex: ${props => (props.ignore ? 'none' : '1')};
  flex-direction: column; /* Add this line */
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  align-items: ${props => props.align ? props.align : "center"}};
  width: ${props => (props.width ? props.width : "100%")};
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "center"};
  justify-content: center;
  margin-top: ${props => props.ignoreMarginTop ? '0px' : '0.5vh'};
  padding: ${props => props.ignorePadding ? '0px' : '0.5vh'};

  > *:not(:last-child) {
    margin-bottom: ${props => props.space};
  }
`;

const HorizontalStack = styled.div`
  display: flex;
  align-items: ${props => props.customAlign ? props.customAlign : "center"};
  padding: ${props => props.customPadding ? props.customPadding : "1vh"};

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: ${props => props.customJustify ? props.customJustify : "center"};
`;

const StyledInput = styled.input`
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  font-size: 2.2vh;
  background-color: white;
  text-align: center;
  border-width: 0px;
  margin-top: 0;
  width: ${props => props.width};
  height: 3vh;
  border-radius: 1px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  background-color: #f5a338;
  align-items: center;
  justify-content: center;
  padding: 2vh;
  width: 50%;
  color: #000000;
  border: none;
  border-radius: 1vh;
  height: 6vh;
  font-size: 2.5vh;
  cursor: pointer;
`;

export default CalculatorWithSnapsCombination;
