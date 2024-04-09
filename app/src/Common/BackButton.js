import React from "react";
import { useNavigate } from 'react-router-dom';
import styled, { css } from "styled-components";
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <BackButtonElement onClick={handleGoBack}>
      <ArrowIcon />
      Back
    </BackButtonElement>
  );
};


const BackButtonElement = styled.button`
  position: absolute;
  left: 0.1vw;
  background: none;
  border: none;
  font-size: 2vh;
  display: flex;
  padding-left: 2vw;
  color: white;
  cursor: pointer;
`;

const ArrowIcon = styled(BsArrowLeft)`
  margin-right: 0.5vw;
`;

export default BackButton;