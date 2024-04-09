import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import HeaderComponent from "../Common/HeaderComponent";

const DecadeThreePrepage = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/decade-three`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section backgroundColor="white" ignore maxHeight="10%">
        <span style={{ fontSize: '4vh', paddingTop:"2vh", textAlign:"center"}}>
          <b>Decade 3</b>
        </span>
      </Section>
      <Section ignore width="85%">
        <HorizontalStack>
          <DecadeHNumber>1</DecadeHNumber>
          <DecadeHNumber>2</DecadeHNumber>
          <DecadeHNumber style={{backgroundColor:"black", color:"white"}}>3</DecadeHNumber>
        </HorizontalStack>
      </Section>
      <Section backgroundColor="white" ignore maxHeight="10%" style={{marginTop:"5vh"}}>
        <span style={{ color:"#0476bb", fontSize: '2.8vh', paddingLeft: '7vw', paddingRight: '7vw', textAlign:"center"}}>
          The third decade is the most important wealth building time period!
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginTop:"10vh"}}>
        <span style={{ color:"black", fontSize: '2.8vh', paddingLeft: '7vw', paddingRight: '7vw', textAlign:"center"}}>
          <i>Double a penny each day for 27 days and you get $671,088.64...</i>
        </span>
        <span style={{ color:"black", fontSize: '2.8vh', paddingLeft: '7vw', paddingRight: '7vw', textAlign:"center"}}>
          <i><br/>...Double it just <b>FOUR</b> more days (or 31 total), and you get $10,737,418!</i>
        </span>
      </Section>
      <Section ignore justify={"top"} style={{marginTop:'4vh'}}>
        <Button onClick={nextPage}>Next</Button>
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

  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }

  justify-content: center; /* Updated value */
`;

const DecadeHNumber = styled.div`
  font-weight: 400;
  color: black;
  font-size: 2.5vh;
  background-color: #white;
  text-align: center;
  border-width: 0px;
  border: 1px solid #000000;
  border-radius: 0.5vh;
  margin-top: 0;

  height: 5vh;
  width: 12vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #f5a338;
  color: #000000;
  border: none;
  border-radius: 1vh;
  height: 5vh;
  width: ${props => props.width ? props.width :"70%"};
  font-size: 2.5vh;
  padding: 1vh;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
`;

export default DecadeThreePrepage;