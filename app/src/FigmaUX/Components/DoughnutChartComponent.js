import React, { useEffect, useRef } from 'react';
import { currentDate, totalEnabledYears, totalYears } from '../Global/Global';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { totalSavingsPerContributions } from '../Global/ChartsMath';

function drawPieChart(canvas, 
  age1, age2, age3, 
  isMobile, isTablet,
  startingAge, startingSavings,
  decadeOneMonthlyContribution, decadeTwoMonthlyContribution, decadeThreeMonthlyContribution,
  endYear) {
  
  var totalPerContributions = totalSavingsPerContributions(startingAge, age1, age2, age3, 
    startingSavings,
    decadeOneMonthlyContribution, decadeTwoMonthlyContribution, decadeThreeMonthlyContribution);
    var totalSaved = totalPerContributions[totalPerContributions.length - 1].total3;

    let totalContributed = totalPerContributions.reduce((acc, curr) => {
      return acc + (curr.contributionsTotal1 || 0) + (curr.contributionsTotal2 || 0) + (curr.contributionsTotal3 || 0);
    }, 0);

  var data = {
    labels: ['Contribution', 'Total Saved'],
    datasets: [{
      data: [totalContributed, totalSaved],
      backgroundColor: ['#33CBCC', '#4A7DE2'],
      borderColor: ['transparent', 'transparent'],
    }],
  };

  var options = {
    plugins: {
      title: {
          display: false,
      },
      legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'rectRounded',
            font: {
              family: '"Poppins", sans-serif',
              weight: 'normal',
              size: isMobile ? '8px' : isTablet ? '12px' : '16px'
            }
          }
      },
    },
  };

  // Check if there is an existing chart on the canvas
  if (canvas) {
      // Get the chart instance associated with the canvas
      var existingChart = Chart.getChart(canvas);

      if (existingChart) {
          // Update the data and options of the existing chart
          existingChart.data = data; // Replace newData with your updated data
          existingChart.options = options; // Replace newOptions with your updated options
          existingChart.update(); // Update the chart
          return;
      }
  }

  var chart = new Chart(canvas, {
      type: 'doughnut',
      data: data,
      options: options,
  });
}

function calculateEndYear(stage1Enabled, stage2Enabled, stage3Enabled, age1, age2, age3) {
  let year = currentDate().getFullYear();
  year += totalEnabledYears(age1, age2, age3, stage1Enabled, stage2Enabled, stage3Enabled);

  return year;
}

const DoughnutChartComponent = ({isMobile, isTablet}) => {
  const canvasRef = useRef(null);

  const {
    startingAge,
    startingSavings,
  } = useSelector((state) => state.initialPage);

  const {
    monthlyContribution: decadeOneMonthlyContribution,
    age: decadeOneAge,
    enabled: decadeOneEnabled,
  } = useSelector(state => state.decadeOnePage);

  const {
    monthlyContribution: decadeTwoMonthlyContribution,
    age: decadeTwoAge,
    enabled: decadeTwoEnabled,
  } = useSelector(state => state.decadeTwoPage);

  const {
    monthlyContribution: decadeThreeMonthlyContribution,
    age: decadeThreeAge,
    enabled: decadeThreeEnabled,
  } = useSelector(state => state.decadeThreePage);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const endYear = calculateEndYear(decadeOneEnabled, decadeTwoEnabled, decadeThreeEnabled, decadeOneAge, decadeTwoAge, decadeThreeAge);

    const contributions = [
      !decadeOneEnabled ? 0 : decadeOneMonthlyContribution,
      !decadeTwoEnabled ? 0 : decadeTwoMonthlyContribution,
      !decadeThreeEnabled ? 0 : decadeThreeMonthlyContribution,
    ];
    
    const years = [
      !decadeOneEnabled ? 0 : decadeOneAge === 0 ? 1 : decadeOneAge,
      !decadeTwoEnabled ? 0 : decadeTwoAge === 0 ? 1 : decadeTwoAge,
      !decadeThreeEnabled ? 0 : decadeThreeAge === 0 ? 1 : decadeThreeAge,
    ];

    drawPieChart(canvas, 
      years[0], years[1], years[2], 
      isMobile, isTablet,
      startingAge, startingSavings,
      contributions[0], contributions[1], contributions[2], endYear);

  }, [startingAge, startingSavings, 
    decadeOneMonthlyContribution, decadeTwoMonthlyContribution, decadeThreeMonthlyContribution, 
    decadeOneAge, decadeTwoAge, decadeThreeAge, 
    decadeOneEnabled, decadeTwoEnabled, decadeThreeEnabled, 
    isMobile, isTablet]);

  return (
    <canvas id="piechart" ref={canvasRef}></canvas>
  );
};

export default DoughnutChartComponent;
