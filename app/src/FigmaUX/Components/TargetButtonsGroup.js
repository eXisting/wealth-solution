import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import unselectedCoin from '../../Media/coins/unselected/coin.svg';
import unselectedCoin1 from '../../Media/coins/unselected/coin1.svg';
import unselectedCoin2 from '../../Media/coins/unselected/coin2.svg';
import selectedCoin from '../../Media/coins/selected/coin.svg';
import selectedCoin1 from '../../Media/coins/selected/coin1.svg';
import selectedCoin2 from '../../Media/coins/selected/coin2.svg';

import checkmark from '../../Media/checkmark.svg';
import '../css/components.css';

const TargetButtonsGroup = ({ desiredResult, reduxUpdate }) => {
  const theme = useTheme();

  const [activeButton, setActiveButton] = useState(
    desiredResult === 1000000 ? 0 : desiredResult === 3000000 ? 1 : desiredResult === 5000000 ? 2 : 0
  );

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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
      width={isTablet ? '70%' : '100%'}
      display="flex"
      flexDirection={isMobile || isTablet ? 'column' : 'row'}
      alignItems={isMobile || isTablet ? 'stretch' : 'center'}
      justifyContent='center'
      gap={isMobile ? '7px' : isTablet ? '10px' : '74px'}
    >
      {buttonData.map((button, index) => (
        <Box
          position={'relative'}
          padding={isMobile ? '20px' : '30px'}
          borderRadius={isMobile ? '10px' : isTablet ? '15px' : '20px'}
          key={index}
          flex="1"
          maxWidth={!isMobile && !isTablet ? '280px' : '100%'}
          flexDirection={isMobile || isTablet ? 'row' : 'column'}
          onClick={() => toggleActiveMillionButton(index, button.value)}
          sx={{ cursor: 'pointer' }}
          className={`selectable-button ${activeButton === index ? 'active montserrat-bold' : 'montserrat-regular'}`}
        >
          <Box className="selectable-button-icon">
            <img src={activeButton === index ? button.selectedImgSrc : button.unselectedImgSrc} alt="Coin Icon" />
          </Box>
          <Box className="selectable-button-text">{button.text}</Box>
          {activeButton === index && <Box className={isMobile || isTablet ? "selectable-button-icon-right" : "selectable-button-icon-top-right"}>
              <img src={checkmark} alt="Checkmark Icon" />
            </Box>
          }
        </Box>
      ))}
    </Box>
  );
};

export default TargetButtonsGroup;
