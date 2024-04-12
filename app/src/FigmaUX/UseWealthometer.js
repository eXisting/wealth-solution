import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { currentDayFormatted, formatCurrency, totalEnabledYears, trimToInt } from './Global/Global';
import CurvedLineChartComponent from './Components/CurvedLineChartComponent';
import PieChartComponent from './Components/PieChartComponent';
import { totalSavingsPerContributions } from './Global/ChartsMath';
import CircleSlider from './Components/CircleSlider';
import { calculateSavings } from './Global/Math';

// Media
import money from '../Media/money.svg'
import donation from '../Media/donation.svg'

// Redux
import {
  updateMonthlyContribution,
} from '../redux/decadeOneReducer';

import CurvedLineChartControlledComponent from './Components/CurvedLineChartControlledComponent';
import PieChartControlledComponent from './Components/PieChartControlledComponent';
import NavigationHeaderComponent from './Components/NavigationHeaderComponent';

const UseWealthometer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    monthlyContribution,
  } = useSelector((state) => state.decadeOnePage);

  const handleUpdateContributions = (newValue) => {
    dispatch(updateMonthlyContribution(newValue));
  };

  function calculateTotal() {
    const sumContributions = monthlyContribution * 12 * 40;
    const sum = calculateSavings(monthlyContribution, 40, 0);
    const interestEarned = sumContributions - sum;

    return { sum, sumContributions, interestEarned };
  }

  const nextPage = () => {
    navigate(`/???`);
  };

  return (
    <Box gap={8}>
      <NavigationHeaderComponent></NavigationHeaderComponent>
      <Box sx={{ m: 2, justifyContent: 'flex-start' }}>
        <Typography variant="h5">Use Wealthometer to predict your wealth</Typography>
        <Typography variant="body2" sx={{ fontSize: 'var(--font-size-small)' }}>
          {currentDayFormatted()}
        </Typography>
      </Box>
      <CircleSlider min={0} max={20000} 
        step={100}
        initialValue={trimToInt(monthlyContribution)} 
        titleText={"Monthly Savings"}
        updateRedux={handleUpdateContributions} 
      />
      <Box className="section padded-section" display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ m: 2 }}>
        <Box>
          <Typography variant="h5" style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center', marginBottom:4 }}>
            Your investment will<br /> be worth
          </Typography>
          <Typography variant="h2" style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center', color:'#4A7DE2' }}>
            {formatCurrency('$', false, calculateTotal().sum)}
          </Typography>
        </Box>
        <Typography variant="body2" style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>(over 40 years)</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"4rem", paddingBottom:"4rem" }}>
        <Box display="flex" flexDirection="row" gap={8}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={money} alt="Total Interest Earned" width="100rem" />
            <Typography variant='body2'>Total Interest Earned</Typography>
            <Typography variant='body1' color={'#4A7DE2'}>{formatCurrency('$', false, calculateTotal().interestEarned)}</Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={donation} alt="Total Contributions" width="100rem" />
            <Typography variant='body2'>Total Contributions</Typography>
            <Typography variant='body1' color={'#4A7DE2'}>{
            formatCurrency('$', false, calculateTotal().sumContributions)}</Typography>
          </Box>
        </Box>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem', margin: '2rem', marginTop: '4rem' }}>
        <CurvedLineChartControlledComponent years={40} step={10} monthlyContributions={monthlyContribution} initialSavings={0}/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30rem', margin: '2rem', paddingBottom:'3rem' }}>
        <PieChartControlledComponent years={40} monthlyContributions={monthlyContribution} initialSavings={0}/>
      </div>
    </Box>
  );
}

export default UseWealthometer;