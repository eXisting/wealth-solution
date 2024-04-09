import React, { useState } from 'react';
import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Common/HeaderComponent';

const WelcomeThingsToKnowPage = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/welcome-savings-formula`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section ignore width="80%" backgroundColor="#0476bb" style={{marginTop:"2vh"}}>
        <span style={{ color: 'white', fontSize: '4vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          <b>The 10 Commandments of Wealth</b>
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{fontSize:"2.2vh"}}>
        <VerticalStack style={{paddingLeft:"4vw", paddingRight:"4vw"}}>
          <HorizontalStack space="3vh">
            <span style={{color:"#0476bb"}}>(1)</span>
            <span>Anyone can save millions</span>
          </HorizontalStack>
          <HorizontalStack space="3vh">
            <span style={{color:"#0476bb"}}>(2)</span>
            <span>The earlier you save, the less impact on lifestyle</span>
          </HorizontalStack>
          <HorizontalStack space="3vh">
            <span style={{color:"#0476bb"}}>(3)</span>
            <span>It’s nearly impossible to become rich without time</span>
          </HorizontalStack>
          <HorizontalStack space="3vh">
            <span style={{color:"#0476bb"}}>(4)</span>
            <span>Compounding interest is a wealth building mathematical gift</span>
          </HorizontalStack>
          <HorizontalStack space="3vh">
            <span style={{color:"#0476bb"}}>(5)</span>
            <span>Where to invest is not complicated</span>
          </HorizontalStack>
          <HorizontalStack space="3vh">
            <span style={{color:"#0476bb"}}>(6)</span>
            <span>We must save first, then spend the rest</span>
          </HorizontalStack>
          <HorizontalStack space="3vh">
            <span style={{color:"#0476bb"}}>(7)</span>
            <span>The only path to wealth is ownership, a business or stocks</span>
          </HorizontalStack>
          <HorizontalStack space="3vh">
            <span style={{color:"#0476bb"}}>(8.)</span>
            <span>Savings must be automatic and grow with your income</span>
          </HorizontalStack>
          <HorizontalStack space="3vh">
            <span style={{color:"#0476bb"}}>(9.)</span>
            <span>Saving requires a one-time plan, not a life long decision making process</span>
          </HorizontalStack>
          <HorizontalStack space="3vh">
            <span style={{color:"#0476bb"}}>(10)</span>
            <span>Being wealthy is more fun than not being wealthy</span>
          </HorizontalStack>
        </VerticalStack>
      </Section>
      <Section justify={"top"} style={{marginTop:'2vh', marginBottom:'15vh'}}>
        <Button onClick={nextPage}>Next</Button>
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

const PaddingSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4vh;
  padding-bottom: 2vh; 
  margin-bottom: 0.5vh;
  margin-top: 0.5vh;
  text-align: center;
  width: 80%;
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
  background-color: #0476bb;
  color: #ffffff;
  border: none;
  border-radius: 1vh;
  height: 5vh;
  width: ${props => props.width ? props.width :"50%"};
  font-size: 2vh;
  padding: 1vh;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
`;

export default WelcomeThingsToKnowPage;