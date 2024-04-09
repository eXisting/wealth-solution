import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Common/HeaderComponent';

const FollowSteps = () => {
  const navigate = useNavigate();

  const learn = () => {
    
  };
  
  return (
    <Container>
      <HeaderComponent hasBackButton={true}></HeaderComponent>
      <Section ignore width="85%" style={{marginTop:"2vh"}}>
        <span style={{ color: 'black', fontSize: '4vh', paddingTop: "0.5vh", paddingBottom: "0.5vh", textAlign:"center"}}>
          Follow these steps
        </span>
      </Section>
      <Section backgroundColor="white" ignore style={{fontSize:"2.2vh"}}>
        <VerticalStack style={{paddingLeft:"4vw", paddingRight:"4vw"}}>
          <HorizontalStack space="1vh">
            <span>1.</span>
            <span>Setup and automated savings plan <LinkText href="http://www.juststartgo.com/blog2/2022/1/27/everyone-can-be-a-multimillionaire-heres-how">Learn more</LinkText></span>
          </HorizontalStack>
          <HorizontalStack space="1vh">
            <span>2.</span>
            <span>Setup a online brokerage account, like Schwab or Robinhood. <LinkText href="http://www.juststartgo.com/blog2/2022/1/27/everyone-can-be-a-multimillionaire-heres-how">Learn more</LinkText></span>
          </HorizontalStack>
          <HorizontalStack space="1vh">
            <span>3.</span>
            <span>Auto transfer a small amount into the brokerage account, like $100. <LinkText href="http://www.juststartgo.com/blog2/2022/1/27/everyone-can-be-a-multimillionaire-heres-how">Learn more</LinkText></span>
          </HorizontalStack>
          <HorizontalStack space="1vh">
            <span>4.</span>
            <span>Auto invest it monthly into a low cost index fund like the S & P 500 funds, SWPPX or xxx. <LinkText href="http://www.juststartgo.com/blog2/2022/1/27/everyone-can-be-a-multimillionaire-heres-how">Learn more</LinkText></span>
          </HorizontalStack>
          <HorizontalStack space="1vh">
            <span>5.</span>
            <span>Calculate how much you can save this year, and next year. <LinkText href="http://www.juststartgo.com/blog2/2022/1/27/everyone-can-be-a-multimillionaire-heres-how">Learn more</LinkText></span>
          </HorizontalStack>
        </VerticalStack>
      </Section>
      <Section justify={"top"} ignore width="80%" style={{border:"0.2vh solid #000000", padding:"2vh"}}>
        <span style={{textAlign:"center"}}>For the past 30, 50 and 80 years, <br/> these steps have produced an <br/> annual return of more than 10%.</span>
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

const HorizontalStack = styled.div`
  display: flex;
  padding: 1vh;
  justify-content: top;
  
  > *:not(:last-child) {
    margin-right: ${props => props.space};
  }
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "left"};
  justify-content: top;
  margin-top: ${props => props.ignoreMarginTop ? '0px' : '0.5vh'};
  padding: ${props => props.ignorePadding ? '0px' : '0.5vh'};

  > *:not(:last-child) {
    margin-bottom: ${props => props.space};
  }
`;

const LinkText = styled.a`
    color: #f5a338;
    text-decoration: none;
    href: ${props => props.href};
`;

export default FollowSteps;