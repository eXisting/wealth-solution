import React, { useState } from 'react';
import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Common/HeaderComponent';

const CalculateFromTotalSavings = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/???`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={false}></HeaderComponent>
      <Section ignore width="85%" style={{marginTop:"2vh", marginBottom:"7vh"}}>
        <span style={{ color: 'black', fontSize: '3vh', paddingLeft: '1vh', paddingRight: '1vh', textAlign:"center"}}>
          Calculate from total savings
        </span>
      </Section>
      <Section justify={"top"} style={{marginTop:"2vh"}}>
        <VerticalStack style={{gap:"1rem"}}>
          <Button onClick={nextPage}>Use Wealthometer</Button>
          <Button onClick={nextPage}>Income based calculation</Button>
        </VerticalStack>
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
  align-items: ${props => props.align ? props.align : "center"};
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

const Button = styled.button`
  background-color: #f5a338;
  color: #000000;
  border: none;
  border-radius: 1vh;
  height: 6vh;
  width: ${props => props.width ? props.width :"100%"};
  font-size: 2.5vh;
  padding: 1vh;
  cursor: pointer;
`;

export default CalculateFromTotalSavings;