import React, { useState } from 'react';
import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Common/HeaderComponent';

const WelcomePage = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/savings-graph`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={false}></HeaderComponent>
      <Section ignore width="85%" backgroundColor="#0476bb" style={{marginTop:"2vh", marginBottom:"0.5vh"}}>
        <span style={{ color: 'white', fontSize: '3.5vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          Did you know these facts about millionaires?
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginBottom:"1vh"}}>
        <VerticalStack style={{paddingLeft:"8vw", paddingRight:"8vw"}}>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span>86% of millionaires made their own wealth (not inherited)</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span>76% started out as middle class or poor</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span>All save an average of 23% of their income</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span>Millionaires all know something about math.</span>
            </BulletPointText>
          </HorizontalStack>
          <HorizontalStack>
            <BulletPointText>
              <CheckmarkIconComponent />
              <span>Investing your money in an index fund has averaged 10% return for the last 30, 40 & 80 years</span>
            </BulletPointText>
          </HorizontalStack>
          <span style={{ fontSize: '3.5vh', textAlign:"center", marginTop:"2vh"}}>
            The bottom line is <br/> everyone can be wealthy!
          </span>
        </VerticalStack>
      </Section>
      <Section justify={"top"} style={{marginTop:"2vh"}}>
        <Button onClick={nextPage}>Let’s prove it -{'>'}</Button>
      </Section>
    </Container>
  );
}

const CheckmarkIconComponent = () => (
  <span style={{fontSize:"4vh", paddingRight:"2vw"}}>✓</span>
);

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

const HorizontalStack = styled.div`
  display: flex;
  align-items: center;
  padding: 1vh;
  
  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }
`;

const BulletPointText = styled.div`
  display: flex;
  align-items: center;
  color: back;
  font-size: 2.5vh;
  text-align: left;
  width: 3wh;
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

export default WelcomePage;