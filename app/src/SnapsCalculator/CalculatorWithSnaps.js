import React, { useEffect } from "react";
import styled from "styled-components";
import SavingsSection from "./SavingsSection";
import NumbericSnaps from "./NumbericSnaps";
import { useDispatch, useSelector } from "react-redux";
import HeaderComponent from "../Common/HeaderComponent";

import { updateStartingSavings, updateStartingAge } from '../redux/initialValuesReducer';

import {
  updateMonthlyContribution as updateFirstDecadeMonthlyContribution,
  updateAge as updateFirstDecadeAge,
  updateTotalDecadeSavings as updateFirstDecadeTotalSavings,
} from '../redux/decadeOneReducer';

import {
  updateMonthlyContribution as updateSecondDecadeMonthlyContribution,
  updateAge as updateSecondDecadeAge,
  updateTotalDecadeSavings as updateSecondDecadeTotalSavings,
} from '../redux/decadeTwoReducer';

import {
  updateMonthlyContribution as updateThirdDecadeMonthlyContribution,
  updateAge as updateThirdDecadeAge,
  updateTotalDecadeSavings as updateThirdDecadeTotalSavings,
} from '../redux/decadeThreeReducer';

const CalculatorWithSnaps = () => {
  const dispatch = useDispatch();

  const {
    startingSavings,
    startingAge,
  } = useSelector(
    (state) => state.initialPage
  );
  
  const {
    monthlyContribution: decadeOneMonthlyContribution,
    age: decadeOneAge,
    totalDecadeSavings: decadeOneTotalSavings,
  } = useSelector(
    (state) => state.decadeOnePage
  );

  const {
    monthlyContribution: decadeTwoMonthlyContribution,
    age: decadeTwoAge,
    totalDecadeSavings: decadeTwoTotalSavings,
  } = useSelector(
    (state) => state.decadeTwoPage
  );

  const {
    monthlyContribution: decadeThreeMonthlyContribution,
    age: decadeThreeAge,
    totalDecadeSavings: decadeThreeTotalSavings,
  } = useSelector(
    (state) => state.decadeThreePage
  );

  useEffect(() => {
    let age = Number(startingAge);

    dispatch(updateFirstDecadeAge(age + 10));
    dispatch(updateSecondDecadeAge(age + 20));
    dispatch(updateThirdDecadeAge(age + 30));
  }, [startingAge]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeOneMonthlyContribution, startingSavings, updateFirstDecadeTotalSavings);
  }, [decadeOneMonthlyContribution, startingAge, startingSavings]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeTwoMonthlyContribution, decadeOneTotalSavings, updateSecondDecadeTotalSavings);
  }, [decadeTwoMonthlyContribution, decadeOneTotalSavings]);

  useEffect(() => {
    updateDecadeTotalSavings(decadeThreeMonthlyContribution, decadeTwoTotalSavings, updateThirdDecadeTotalSavings);
  }, [decadeThreeMonthlyContribution, decadeTwoTotalSavings]);

  const updateDecadeTotalSavings = (contribution, savings, updateAction) => {
    if (savings === 0 && contribution === 0) {
      dispatch(updateAction(0));
      return;
    }

    const r = parseFloat(10) / 100;
    const n = 12;
    
    var t = 10;
    var P = parseFloat(savings.replace(/[^0-9]/g, ''));

    const futureValue = P * Math.pow(1 + (r / n), n * t) + contribution * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));

    const saved = Math.round(futureValue).toLocaleString();
    dispatch(updateAction(saved));
  };

  const initialDepositChanged = (value) => {
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateStartingSavings(numericValue));
  };

  const initialAgeChanged = (value) => {
    dispatch(updateStartingAge(value));
  };

  const decadeOneContributionChanged = (value) => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateFirstDecadeMonthlyContribution(numericValue));
  };

  const decadeTwoContributionChanged = (value) => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateSecondDecadeMonthlyContribution(numericValue));
  };

  const decadeThreeContributionChanged = (value) => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateThirdDecadeMonthlyContribution(numericValue));
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton></HeaderComponent>
      <Section backgroundColor="#0476bb" ignore maxHeight={"20%"} style={{"height":"12vh"}}>
        <HorizontalStack space="1vw">
          <span style={{ color: '#ffffff', fontSize: '4vh', textAlign: 'center', marginRight: '2vw'}}>
            <b>Your total savings! <br></br> ${decadeThreeTotalSavings}</b>
          </span>
        </HorizontalStack>
      </Section>
      <Section ignore maxHeight={"0.8vh"} style={{"height" : "0.8vh"}}></Section>
      <Section backgroundColor="#808080" ignore maxHeight={"25%"}>
          <HorizontalStack space="3vh" align="right">
            <span style={{ color: '#ffffff', fontSize: '2vh', textAlign: 'right' }}><b>How old are you?</b></span>
            <StyledInput
              value={startingAge}
              selectTextOnFocus={true}
              maxLength={2}
              width={"40%"}
              onInput={e => initialAgeChanged(e.target.value)}
            />
          </HorizontalStack>
      </Section>
      <Section ignore style={{padding:"1vh"}}>
        <HorizontalStack customPadding={"0px"} space={"1vh"}>
          <span style={{ fontSize: '2.2vh', textAlign: 'center' }}>What are you total <br/>savings today?</span>
          <NumbericSnaps 
              callback={initialDepositChanged} 
              min={0} 
              maxLength={15}
              interval={1000}
              sign={'$'}
              initialValue={startingSavings}
              custom={true}
              inputFieldHeight={"4vh"}
            />
        </HorizontalStack>
      </Section>
      <Section ignore style={{border:"1px solid #000000", height:"4vh"}} backgroundColor="#C0C0C0">
        <span style={{ color: 'black', fontSize: '2.5vh', textAlign: 'center' }}><b>Decade 1</b></span>
      </Section>
      <Section ignore maxHeight={"50%"}>
        <SavingsSection
          fromAge={decadeOneAge}
          toAge={decadeOneAge + 10}  
          totalAmount={decadeOneTotalSavings}
          monthlyCallback={decadeOneContributionChanged}
          min={0}
          symbolsCountMax={15} 
          customFormula={true}
          interval={100}
          initialSavingsValue={decadeOneMonthlyContribution}
        />
      </Section>
      <Section ignore style={{border:"1px solid #000000", height:"4vh"}} backgroundColor="#C0C0C0">
        <span style={{ color: 'black', fontSize: '2.5vh', textAlign: 'center' }}><b>Decade 2</b></span>
      </Section>
      <Section ignore align="top" maxHeight={"50%"}>
        <SavingsSection
          fromAge={decadeTwoAge}
          toAge={decadeTwoAge + 10}   
          totalAmount={decadeTwoTotalSavings}
          monthlyCallback={decadeTwoContributionChanged} 
          min={0} 
          symbolsCountMax={15} 
          customFormula={true}
          interval={500}
          initialSavingsValue={decadeTwoMonthlyContribution}
          />
      </Section>
      <Section ignore style={{border:"1px solid #000000", height:"4vh" }} backgroundColor="#C0C0C0">
        <span style={{ color: 'black', fontSize: '2.5vh', textAlign: 'center' }}><b>Decade 3</b></span>
      </Section>
      <Section ignore align="top" maxHeight={"50%"} >
        <SavingsSection 
          fromAge={decadeThreeAge}
          toAge={decadeThreeAge + 10}  
          totalAmount={decadeThreeTotalSavings}
          monthlyCallback={decadeThreeContributionChanged} 
          min={0} 
          symbolsCountMax={15} 
          customFormula={true}
          interval={500}
          initialSavingsValue={decadeThreeMonthlyContribution}
          />
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
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: ${props => props.customJustify ? props.customJustify : "center"};
  align-items: ${props => props.align ? props.align : "center"};
  width: 100%;
  background-color: ${props => props.backgroundColor};
  position: relative;
  padding: '2vh'
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

export default CalculatorWithSnaps;
