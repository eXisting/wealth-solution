import React, { useState } from 'react';
import { Grid } from '@mui/material';

import coin from '../../Media/coin.svg';
import coin2 from '../../Media/coin2.svg';
import coin3 from '../../Media/coin3.svg';
import checkmark from '../../Media/checkmark.svg';
import '../css/components.css';

const TargetButtonsGroup = ({desiredResult, reduxUpdate}) => {
  const [activeButton, setActiveButton] = useState(desiredResult === 1000000 ? 0 : desiredResult === 3000000 ? 1 : 2);

  const toggleActiveMillionButton = (index, value) => {
    setActiveButton(index);
    reduxUpdate(value);
  };

  return (
    <Grid container direction="column" spacing={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <Grid item>
        <div
          className={`selectable-button ${activeButton === 0 ? 'active montserrat-bold' : 'montserrat-regular'}`}
          onClick={() => toggleActiveMillionButton(0, 1000000)}
        >
          <div className="selectable-button-icon"><img src={coin} alt="Coin Icon" /></div>
          <div className="selectable-button-text">$1,000,000</div>
          {activeButton === 0 && <div className="selectable-button-icon-right"><img src={checkmark} alt="Checkmark Icon" /></div>}
        </div>
      </Grid>
      <Grid item>
        <div
          className={`selectable-button ${activeButton === 1 ? 'active montserrat-bold' : 'montserrat-regular'}`}
          onClick={() => toggleActiveMillionButton(1, 3000000)}
        >
          <div className="selectable-button-icon"><img src={coin2} alt="Coin Icon" /></div>
          <div className="selectable-button-text">$3,000,000</div>
          {activeButton === 1 && <div className="selectable-button-icon-right"><img src={checkmark} alt="Checkmark Icon" /></div>}
        </div>
      </Grid>
      <Grid item>
        <div
          className={`selectable-button ${activeButton === 2 ? 'active montserrat-bold' : 'montserrat-regular'}`}
          onClick={() => toggleActiveMillionButton(2, 5000000)}
        >
          <div className="selectable-button-icon"><img src={coin3} alt="Coin Icon" /></div>
          <div className="selectable-button-text">$5,000,000</div>
          {activeButton === 2 && <div className="selectable-button-icon-right"><img src={checkmark} alt="Checkmark Icon" /></div>}
        </div>
      </Grid>
    </Grid>
  );
};

export default TargetButtonsGroup;
