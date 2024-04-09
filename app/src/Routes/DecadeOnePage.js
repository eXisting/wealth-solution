import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import NumbericSnaps from "../SnapsCalculator/NumbericSnaps";

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateCapital,
  updateDecadeIncome,
  updateMonthlyContribution,
  updateTotalDecadeSavings,
  updatePercents,
  updateAge,
} from '../redux/decadeOneReducer';
import HeaderComponent from "../Common/HeaderComponent";

const DecadeOnePage = () => {
  const dispatch = useDispatch();

  const {
    age,
    decadeIncome,
    monthlyContribution,
    totalDecadeSavings,
    savingsPercentage,
  } = useSelector((state) => state.decadeOnePage);

  const {
    startingSavings,
    startingAge,
  } = useSelector((state) => state.initialPage);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateAge(Number(startingAge) + 10));
    dispatch(updateCapital(startingSavings));
  }, []);

  useEffect(() => {
    calculateSavings();
  }, [decadeIncome, monthlyContribution, totalDecadeSavings, savingsPercentage]);

  const calculateSavings = () => {
    const contribution = Math.round(decadeIncome * (parseFloat(savingsPercentage) / 100) / 12);
    dispatch(updateMonthlyContribution(contribution));

    if (startingSavings === 0 && contribution === 0) {
      dispatch(updateTotalDecadeSavings(0));
      return;
    }

    const r = parseFloat(10) / 100;
    const n = 12;
    
    var t = 10;
    var P = parseFloat(startingSavings.replace(/[^0-9]/g, ''));

    const futureValue = P * Math.pow(1 + (r / n), n * t) + contribution * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));

    const saved = Math.round(futureValue).toLocaleString();
    dispatch(updateTotalDecadeSavings(saved));
  };

  const updateDecadeValue = value => {
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updateDecadeIncome(numericValue));
  };

  const updatePercentSavings = value => {
    const numericValue = value.toString().replace(/[^0-9]/g, ''); // Remove non-numeric characters
    dispatch(updatePercents(numericValue));
  };

  const nextPage = () => {
    navigate(`/decade-two`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section backgroundColor="white" ignore maxHeight="10%">
        <span style={{ fontSize: '4vh', marginTop:"2vh", textAlign:"center"}}>
          <b>Decade 1</b>
        </span>
      </Section>
      <Section ignore width="85%" style={{ marginTop:"2vh", marginBottom:"3vh"}}>
        <HorizontalStack>
          <DecadeHNumber style={{backgroundColor:"black", color:"white"}}>1</DecadeHNumber>
          <DecadeHNumber>2</DecadeHNumber>
          <DecadeHNumber>3</DecadeHNumber>
        </HorizontalStack>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%" width="95%" >
        <span style={{ color:"#0476bb", fontSize: '2.5vh', textAlign:"center"}}>
          Your savings between the ages of {startingAge} to {age}.
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{width:"90%", paddingTop:"1vh"}}>
          <VerticalStack align="center">
          <Section ignore style={{paddingBottom:"2vh"}}>
            <span style={{ fontSize: '2.5vh', textAlign: 'center', color: 'gray', marginBottom:"1vh" }}>
              Estimate your 10 year average income
            </span>
            <NumbericSnaps 
              callback={updateDecadeValue}
              min={0} 
              maxLength={15} 
              interval={5000}
              initialValue={decadeIncome}
              sign={'$'}
              custom={true}
              inputFieldHeight={"4vh"}
            />
            </Section>
            <span style={{ fontSize: '2.5vh', textAlign: 'center', color: 'gray', marginBottom:"1vh"}}>
              What % of your income can you save?
            </span>
            <NumbericSnaps 
              callback={updatePercentSavings}
              min={0} 
              max={100} 
              interval={1}
              initialValue={savingsPercentage}
              sign={'%'}
              signAtTheEnd={true}
              inputFieldHeight={"4vh"}
            />
          </VerticalStack>
        <span style={{ fontSize: '3vh', textAlign: 'center', marginTop:"2vh" }}>
          You’re saving ${monthlyContribution} each month?
        </span>
      </Section>
      <Section ignore maxHeight="10%" style={{marginTop:"2vh"}}>
        <span style={{ color: '#0476bb', fontSize: '2.5vh', paddingLeft: '1vw', paddingRight: '1vw', textAlign:"center"}}>
          You’re {age} and already saved ${totalDecadeSavings}!
        </span>
      </Section>
      <Section ignore justify={"top"} style={{marginTop:'4vh'}}>
        <Button onClick={nextPage}>Let’s save more -{">"}</Button>
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
  align-items: ${props => props.align ? props.align : "left"};
  justify-content: ${props => props.customJustify ? props.customJustify : "center"};
  margin-top: ${props => props.ignoreMarginTop ? '0px' : '0.5vh'};
  padding: ${props => props.ignorePadding ? '0px' : '0.5vh'};

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

  justify-content: ${props => props.customJustify ? props.customJustify : "center"};
`;

const Button = styled.button`
  background-color: #f5a338;
  color: #000000;
  border: none;
  border-radius: 1vh;
  height: 6vh;
  width: ${props => props.width ? props.width :"70%"};
  font-size: 2.5vh;
  padding: 1vh;
  cursor: pointer;
`;

const DecadeHNumber = styled.div`
  font-weight: 400;
  color: black;
  font-size: 2.5vh;
  background-color: #white;
  text-align: center;
  border-width: 0px;
  border: 1px solid #000000;
  border-radius: 0.1vh;
  margin-top: 0;

  height: 5vh;
  width: 12vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DecadeOnePage;