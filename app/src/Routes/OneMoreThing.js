import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "../Common/HeaderComponent";

const OneMoreThing = () => {

  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/calculated`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section ignore width="85%" backgroundColor="#0476bb" style={{marginTop:"2vh"}}>
        <span style={{ color: 'white', fontSize: '4vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          One more thing...
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginTop:"7vh", marginBottom:"2vh"}} width="90%">
        <span style={{ fontSize: '3vh', textAlign:"center" }}>
          Before we show you the path to wealth....
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginTop:"2vh"}} width="90%">
        <span style={{ fontSize: '3vh', textAlign:"center"}}>
          Think about savings in stages.
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginTop:"2vh"}} width="90%">
        <span style={{ fontSize: '3vh', textAlign:"center"}}>
          The early years you <br/> save less, and over time you <br/> save more.
        </span>
      </Section>
      <Section ignore justify={"top"} style={{marginTop:'10vh'}}>
        <Button onClick={nextPage}>{"Let's see it! ->"}</Button>
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

export default OneMoreThing;