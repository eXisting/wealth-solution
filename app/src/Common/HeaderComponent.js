import React from "react";
import styled, { css } from "styled-components";
import BackButton from "./BackButton";

const HeaderComponent = ({hasBackButton}) => {
  return (
    <Section backgroundColor="#111111" ignore maxHeight={"10%"}>
      {hasBackButton && <BackButton />}
      <VerticalStack style={{ padding: '2vh' }}>
        <ApplicationTitle>
          <b>BeWealther</b>
        </ApplicationTitle>
      </VerticalStack>
    </Section>
  );
};

const Section = styled.section`
  flex: ${props => (props.ignore ? 'none' : '1')};
  display: flex;
  max-height: ${props => (props.maxHeight ? props.maxHeight : 'none')};
  justify-content: ${props => props.customJustify ? props.customJustify : "center"};
  align-items: ${props => props.align ? props.align : "center"};
  width: 100%;
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align ? props.align : "center"};
  justify-content: center;
  margin-top: ${props => props.ignoreMarginTop ? '0px' : '0.5vh'};
  padding: ${props => props.ignorePadding ? '0px' : '0.5vh'};

  > *:not(:last-child) {
    margin-bottom: ${props => props.space};
  }
`;

const ApplicationTitle = styled.span`
  font-family: Tahoma;
  font-style: normal;
  color: rgba(255, 255, 255, 1);
  font-size: 2.5vh;
  text-align: center;
`;

export default HeaderComponent;