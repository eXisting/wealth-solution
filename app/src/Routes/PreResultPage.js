import React, { useEffect }  from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "../Common/HeaderComponent";
import { useDispatch, useSelector } from "react-redux";

const PreResultPage = () => {

  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/calculated`);
  };

  const {
    monthlyContribution: decadeThreeMonthlyContribution,
    age: decadeThreeAge,
    totalDecadeSavings: decadeThreeTotalSavings,
  } = useSelector(
    (state) => state.decadeThreePage
  );
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section ignore width="85%" backgroundColor="#0476bb" style={{marginTop:"2vh"}}>
        <span style={{ color: 'white', fontSize: '4vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          Congratulations, you’re wealthy!
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginTop:"4vh"}} width="90%">
        <span style={{ fontSize: '4vh', textAlign:"center"}}>
          You have
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginTop:"2vh", marginBottom:"2vh"}} width="90%">
        <span style={{ fontSize: '8vh', textAlign:"center" }}>
          <b>${decadeThreeTotalSavings}</b>
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{marginTop:"2vh"}} width="90%">
        <span style={{ fontSize: '4vh', textAlign:"center"}}>
          Can you save more, usually the answer is, yes!
        </span>
      </Section>
      <Section ignore justify={"top"} style={{marginTop:'4vh'}}>
        <Button onClick={nextPage}>Increase savings -{">"}</Button>
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
  padding: 1vh;
  cursor: pointer;
`;

export default PreResultPage;