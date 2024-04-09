import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Common/HeaderComponent';

const WelcomeWealthRulesPage = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/initial-data`);
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section ignore width="85%" backgroundColor="#0476bb" style={{marginTop:"2vh", marginBottom:"6vh"}}>
        <span style={{ color: 'white', fontSize: '4vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          Now, let’s really get rich!
        </span>
      </Section>
      <Section ignore width="85%" style={{marginBottom:"4vh"}}>
        <span style={{ color: 'black', fontSize: '3vh', paddingLeft: '1vh', paddingRight: '1vh', textAlign:"center"}}>
          Think about savings by decade, where each decade you earn and save more.
        </span>
      </Section>
      <Section ignore width="85%" style={{marginBottom:"4vh"}}>
        <span style={{ color: 'black', fontSize: '3vh', paddingLeft: '1vh', paddingRight: '1vh', textAlign:"center"}}>
          The longer we save, the less we need to save monthly.
        </span>
      </Section>
      <Section ignore width="85%">
        <span style={{ color: 'black', fontSize: '3vh', paddingLeft: '1vh', paddingRight: '1vh', textAlign:"center"}}>
          Most millionaires save at least 15% of their income.
        </span>
      </Section>
      <Section justify={"top"} ignore style={{marginTop:"7vh"}}>
        <Button onClick={nextPage}>Save by decade -{">"}</Button>
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
  cursor: pointer;
`;

export default WelcomeWealthRulesPage;