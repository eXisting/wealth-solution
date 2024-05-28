import React, { useState } from 'react';
import {Box, createTheme, useMediaQuery, useTheme} from '@mui/material';

import unselectedCoin from '../../Media/coins/unselected/coin.svg';
import unselectedCoin1 from '../../Media/coins/unselected/coin1.svg';
import unselectedCoin2 from '../../Media/coins/unselected/coin2.svg';
import selectedCoin from '../../Media/coins/selected/coin.svg';
import selectedCoin1 from '../../Media/coins/selected/coin1.svg';
import selectedCoin2 from '../../Media/coins/selected/coin2.svg';

import checkmark from '../../Media/checkmark.svg';
import '../css/components.css';

const TargetButtonsGroup = ({ desiredResult, reduxUpdate }) => {

  const [activeButton, setActiveButton] = useState(
    desiredResult === 1000000 ? 0 : desiredResult === 3000000 ? 1 : desiredResult === 5000000 ? 2 : 0
  );

  const theme = createTheme({
    breakpoints: {
      values: {
        narrowMobile: 480,
        mobile: 640,
        narrowTablet: 900,
        tablet: 1280,
        desktop: 1440
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('mobile'));
  const isTablet = useMediaQuery(theme.breakpoints.between('mobile', 'tablet'));

  const buttonData = [
    { unselectedImgSrc: unselectedCoin, selectedImgSrc: selectedCoin, text: '$1,000,000', value: 1000000 },
    { unselectedImgSrc: unselectedCoin1, selectedImgSrc: selectedCoin1, text: '$3,000,000', value: 3000000 },
    { unselectedImgSrc: unselectedCoin2, selectedImgSrc: selectedCoin2, text: '$5,000,000', value: 5000000 }
  ];

  const toggleActiveMillionButton = (index, value) => {
    setActiveButton(index);
    reduxUpdate(value);
  };

  return (
    <Box
      width={isTablet ? '80%' : '100%'}
      display="flex"
      flexDirection={isMobile || isTablet ? 'column' : 'row'}
      alignItems={isMobile || isTablet ? 'stretch' : 'center'}
      justifyContent='center'
      gap={isMobile ? '10px' : isTablet ? '10px' : '45px'}
    >
      {buttonData.map((button, index) => (
        <Box
          position={'relative'}
          padding={isMobile ? '22px' : '30px'}
          borderRadius={isMobile ? '10px' : isTablet ? '15px' : '20px'}
          key={index}
          flex="1"
          maxWidth={!isMobile && !isTablet ? '200px' : '100%'}
          flexDirection={isMobile || isTablet ? 'row' : 'column'}
          onClick={() => toggleActiveMillionButton(index, button.value)}
          sx={{ cursor: 'pointer' }}
          className={`selectable-button ${activeButton === index ? 'active montserrat-bold' : 'montserrat-regular'}`}
        >
          <Box>
            <img
              width={isMobile ? '20px' : '35px'}
              src={activeButton === index ? button.selectedImgSrc : button.unselectedImgSrc}
              alt="Coin Icon" />
          </Box>
          <Box
            className="selectable-button-text"
            fontSize={isMobile ? '20px' : '30px'}
            marginLeft={isMobile ? '20px' : isTablet ? '35px' : '0'}
          >
            {button.text}
          </Box>
          {activeButton === index &&
            <Box
              className={isMobile || isTablet ? "selectable-button-icon-right" : "selectable-button-icon-top-right"}
            >
              <img
                width={isMobile ? '20px' : isTablet ? '35px' : '30px'}
                src={checkmark}
                alt="Checkmark Icon"
              />
            </Box>
          }
        </Box>
      ))}
    </Box>
  );
};

export default TargetButtonsGroup;
