import React, { useState } from 'react';
import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Common/HeaderComponent';
import PennyImage from '../Media/penny.jpg';

const WelcomeSavingsFormulaPage = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/savings-graph`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section ignore width="85%" backgroundColor="#0476bb" style={{marginTop:"2vh", marginBottom:"1vh"}}>
        <span style={{ color: 'white', fontSize: '4vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          Rich people know something about money!
        </span>
      </Section>
      <Section ignore width="80%"  style={{marginBottom:"2vh"}}>
        <span style={{ color: '#0476bb', fontSize: '3vh', textAlign:"center"}}>
          <i><b>It compounds over time.</b></i>
        </span>
      </Section>
      <Section ignore style={{marginBottom:"2vh"}}>
        <span style={{ color: 'black', fontSize: '2.9vh', paddingLeft: '2vh', paddingRight: '2vh', textAlign:"center"}}>
          Let’s start with a penny...
        </span>
      </Section>
      <Section ignore maxHeight="15vh">
        <Image src={PennyImage} alt="Simple penny" />
      </Section>
      <Section ignore style={{marginBottom:"1vh", marginTop:"1vh"}}>
        <span style={{ color: 'black', fontSize: '2.9vh', paddingLeft: '2vh', paddingRight: '2vh', textAlign:"center"}}>
          <i>Double it for <b>27</b> days</i>
        </span>
      </Section>
      <Section ignore>
        <span style={{ color: '#0476bb', fontSize: '4vh', paddingLeft: '2vh', paddingRight: '2vh', textAlign:"center"}}>
          <b><i>You have $671,088</i></b>
        </span>
      </Section>
      <Section ignore style={{marginBottom:"3vh"}}>
        <span style={{ color: 'black', fontSize: '2.9vh', paddingLeft: '2vh', paddingRight: '2vh', textAlign:"center"}}>
          <i>...Double it just <b>FOUR</b> more days</i>
        </span>
      </Section>
      <Section ignore>
        <span style={{ color: '#0476bb', fontSize: '4vh', paddingLeft: '2vh', paddingRight: '2vh', textAlign:"center"}}>
        <b><i>You have $10,737,418</i></b>
        </span>
      </Section>
      <Section ignore>
        <span style={{ color: 'black', fontSize: '2.9vh', paddingLeft: '1vh', paddingRight: '1vh', textAlign:"center"}}>
          <i>That’s $10,066,329 more in FOUR days</i>
        </span>
      </Section>
      <Section justify={"top"} ignore style={{marginTop:"4vh"}}>
        <Button onClick={nextPage}>How does this happen? -{'>'}</Button>
      </Section>
    </Container>
  );
}

const CheckmarkIcon = styled.svg`
  width: 4vh;
  height: 4vh;
  margin-right: 5px;
  align-self: flex-start;
`;

const CheckmarkPath = styled.path`
  fill-rule: evenodd;
`;

const CheckmarkIconComponent = () => (
  <CheckmarkIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <CheckmarkPath
      fill="currentColor"
      d="M5.646 10.854a.5.5 0 0 1-.708 0L2.146 7.354a.5.5 0 0 1 .708-.708l2.646 2.646 6.646-6.646a.5.5 0 1 1 .708.708L5.646 10.854z"
    />
  </CheckmarkIcon>
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
  align-items: ${props => props.align ? props.align : "center"}};
  width: ${props => (props.width ? props.width : "100%")};
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

const Button = styled.button`
  background-color: #f5a338;
  color: #000000;
  border: none;
  border-radius: 1vh;
  height: 6vh;
  width: ${props => props.width ? props.width :"70%"};
  font-size: 2.5vh;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%; /* Default width for all views */

  /* Custom width for horizontal view (landscape) */
  @media (orientation: landscape) {
    width: 10%; /* Adjust the width as needed */
  }

  /* Custom width for vertical view (portrait) */
  @media (orientation: portrait) {
    width: 20%; /* Adjust the width as needed */
  }

  justifyContent: center;
  alignItems: center;
`;

export default WelcomeSavingsFormulaPage;