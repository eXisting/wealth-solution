import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NumbericSnaps from "../SnapsCalculator/NumbericSnaps";
import HeaderComponent from '../Common/HeaderComponent';
import Graph from '../GraphicalComponents/Graph';
import { 
  updateTotalSavings,
  updateMonthlySavings,
} from '../redux/savingGraphReducer';

const WelcomeSavingsGraphPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    monthlySavings,
    totalSavings,
    yearsInterval,
  } = useSelector((state) => state.graphPage);

  const nextPage = () => {
    navigate(`/initial-data`);
  };

  const saveMounthlySavings = value => {
    const numericValue = value.replace(/[^0-9]/g, '');
    dispatch(updateMonthlySavings(numericValue))
  };

  useEffect(() => {
    calculateSavings();
  }, [monthlySavings, yearsInterval]);

  const calculateSavings = () => {
    const r = parseFloat(10) / 100;
    const n = 12;

    const futureValue = monthlySavings * ((Math.pow(1 + (r / n), n * yearsInterval) - 1) / (r / n));

    const saved = Math.round(futureValue).toLocaleString();
    dispatch(updateTotalSavings(saved));
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section ignore width="85%" style={{marginTop:"2vh", marginBottom:"0.5vh"}}>
        <span style={{ fontSize: '5vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          ${totalSavings}!
        </span>
        <span style={{ color:"grey", fontSize: '2.5vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          (Savings over 40 years)
        </span>
      </Section>
      <Section backgroundColor="white" ignore justify={"top"} style={{width:"90%"}}>
        <VerticalStack align="center">
          <span style={{ color: 'black', fontSize: '2.5vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
            Monthly Savings
          </span>
          <NumbericSnaps 
            callback={saveMounthlySavings}
            min={0} 
            maxLength={15} 
            interval={100}
            initialValue={monthlySavings}
            sign={'$'}
            custom={true}
            inputFieldHeight={"4vh"}
            textSize={"3.5vh"}
          />
        </VerticalStack>
      </Section>
      <Section style={{ maxHeight: '40vh', width: '40vh' }}>
        <Graph 
          toYears={yearsInterval}
          stepYears={5}
          compoundingInterest={10}
          monthlySavings={monthlySavings}
          defaultMaxY={6000000}
        ></Graph>
      </Section>
      <Section justify={"top"} ignore style={{paddingTop:'1vh'}}>
        <Button onClick={nextPage}>{"Let’s calculate your wealth ->"}</Button>
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
  justify-content: left;
  margin-top: ${props => props.ignoreMarginTop ? '0px' : '0.5vh'};
  padding: ${props => props.ignorePadding ? '0px' : '0.5vh'};

  > *:not(:last-child) {
    margin-bottom: ${props => props.space};
  }
`;

const HorizontalStack = styled.div`
  display: flex;
  align-items: center;
  padding: 1vh;
  
  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }
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

export default WelcomeSavingsGraphPage;