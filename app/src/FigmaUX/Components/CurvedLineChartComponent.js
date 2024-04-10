import React, { useEffect, useRef } from 'react';
import { calculateSavings, currentDate, trimToInt } from '../Global/Global';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

function drawCurvedLineChart(canvas, 
  age1, age2, age3, 
  startingSavings, 
  stageEnabled1, stageEnabled2, stageEnabled3,
  contribution1, contribution2, contribution3) {

  var totalYears = Number(age1) + Number(age2) + Number(age3);
  var yearsCheckpoints = generateYearsCheckpoints();
  var contributionsCheckpoints = contributionsCheckpoints();
  var savingsCheckpoints = savingsCheckpoints();

  var data = {
      labels: yearsCheckpoints,
      datasets: [
          {
              label: 'Contributions',
              data: contributionsCheckpoints,
              backgroundColor: '#60d937',
              barThickness: 'flex', 
          },
          {
              label: 'Total saved',
              data: savingsCheckpoints,
              backgroundColor: '#0098ff',
              barThickness: 'flex'
          },
      ],
  };

  var options = {
      responsive: true,
      maintainAspectRatio: false, // Set this to false to control the chart size manually
      aspectRatio: 3,
      scales: {
          x: {
              stacked: true,
              position: 'bottom',
              autoSkip: false, // Show all labels
              min: 0,
              max: totalYears,
              ticks: {
                  stepSize: 1,
                  callback: value => {
                      if ((value + 1) % 5 === 0)
                          return value + currentDate().getFullYear();
                  },
              }
          },
          y: {
              stacked: true,
              beginAtZero: true,
              ticks: {
                  callback: value => {
                      return trimToInt(value);
                  },
              }
          },
      },
      plugins: {
          title: {
              display: true,
              text: 'Investment Growth Over Time',
              
              padding: {
                  top: 10,
                  bottom: 15,
              },
              font: {
                  size: '20rem', // Adjust the font size for the title
              },
          },
          legend: {
              display: false
          },
      },
  };

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

  // Create a new Chart.js chart on the canvas
  var ctx = canvas.getContext('2d');

  var chart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
  });

  function generateYearsCheckpoints() {
      let array = new Array(totalYears).fill(0);

      for (let i = 0; i < array.length; i++) {
          array[i] = i + 1;
      }

      return array;
  };
  
  function savingsCheckpoints() {
      let array = new Array(totalYears).fill(0);

      var firstStageResult = [0, startingSavings];
      if (stageEnabled1) {
          let bound = Number(age1);
          for (let i = 0; i < bound; i++) {
              array[i] = calculateSavings(trimToInt(contribution1), yearsCheckpoints[i], startingSavings);
          }

          firstStageResult = [bound, array[bound - 1]];
      }
      
      var secondStageResult = [firstStageResult[0], firstStageResult[1]];
      if (stageEnabled2) {
          let bound = Number(age2);
          
          for (let i = 0, j = firstStageResult[0]; i < bound; i++, j++) {
              array[j] = calculateSavings(trimToInt(contribution2), yearsCheckpoints[i], firstStageResult[1]);
          }

          secondStageResult = [bound + firstStageResult[0], array[bound + firstStageResult[0] - 1]];
      }
      
      if (stageEnabled3) {
          let bound = Number(age3);
          
          for (let i = 0, j = secondStageResult[0]; i < bound; i++, j++) {
              
              array[j] = calculateSavings(trimToInt(contribution3), yearsCheckpoints[i], secondStageResult[1]);
          }
      }
  
      return array;
  }    

  function contributionsCheckpoints() {
      let array = new Array(totalYears).fill(0);
      
      let monthInYear = 12;

      var firstStageResult = [0, startingSavings];
      if (stageEnabled1) {
          let bound = Number(age1);
          for (let i = 0; i < bound; i++) {
              array[i] = yearsCheckpoints[i] * trimToInt(contribution1) * monthInYear;
          }

          firstStageResult = [bound, array[bound - 1]];
      }
      
      var secondStageResult = [firstStageResult[0], firstStageResult[1]];
      if (stageEnabled2) {
          let bound = Number(age2);

          for (let i = 0, j = firstStageResult[0]; i < bound; i++, j++) {
              var base = array[j - 1];
              if (j < 1)
                  base = 0;

              array[j] = base +  trimToInt(contribution2) * monthInYear;
          }

          secondStageResult = [bound + firstStageResult[0], array[bound + firstStageResult[0] - 1]];
      }
      
      if (stageEnabled3) {
          let bound = Number(age3);

          for (let i = 0, j = secondStageResult[0]; i < bound; i++, j++) {
              var base = array[j - 1];
              if (j < 1)
                  base = 0;

              array[j] = base + trimToInt(contribution3) * monthInYear;
          }
      }
  
      return array;
  }
}

const CurvedLineChartComponent = () => {
  const canvasRef = useRef(null);

  const {
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

    drawCurvedLineChart(canvas, 
      decadeOneAge, decadeTwoAge, decadeThreeAge, 
      startingSavings, 
      decadeOneEnabled, decadeTwoEnabled, decadeThreeEnabled,
      decadeOneMonthlyContribution, decadeTwoMonthlyContribution, decadeThreeMonthlyContribution);
  }, [startingSavings, decadeOneMonthlyContribution, decadeTwoMonthlyContribution, decadeThreeMonthlyContribution, 
    decadeOneAge, decadeTwoAge, decadeThreeAge, 
    decadeOneEnabled, decadeTwoEnabled, decadeThreeEnabled]);

  return <canvas id="linechart" ref={canvasRef}></canvas>;
};

export default CurvedLineChartComponent;
