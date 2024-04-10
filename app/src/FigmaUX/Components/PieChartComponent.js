import React, { useEffect, useRef } from 'react';
import { currentDate, totalSavingsPerContributions } from '../Global/Global';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

function drawPieChart(canvas, 
  age1, age2, age3, 
  startingSavings,
  decadeOneMonthlyContribution, decadeTwoMonthlyContribution, decadeThreeMonthlyContribution) {
  var totalPerContributions = totalSavingsPerContributions(age1, age2, age3, 
    startingSavings,
    decadeOneMonthlyContribution, decadeTwoMonthlyContribution, decadeThreeMonthlyContribution);

  var lastTotal = totalPerContributions[totalPerContributions.length - 1];

  var data = {
      labels: ['Total Saved', 'Contribution'],
      datasets: [{
          data: [lastTotal[0], lastTotal[1]],
          backgroundColor: ['#0098ff', '#60d937'],
      }],
  };

  var options = {
      plugins: {
          title: {
              display: true,
              text: 'Investment Balance at Year ' + (currentDate().getFullYear() + Number(age1) + Number(age2) + Number(age3)),
              padding: {
                  top: 10,
                  bottom: 15,
              },
              font: {
                  size: '20rem', // Adjust the font size for the title
              },
          },
          legend: {
              display: false, // Hide the legend
              
          },
      }
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
      type: 'pie',
      data: data,
      options: options,
  });
}

const PieChartComponent = () => {
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

    drawPieChart(canvas, 
      decadeOneAge, decadeTwoAge, decadeThreeAge, 
      startingSavings,
      decadeOneMonthlyContribution, decadeTwoMonthlyContribution, decadeThreeMonthlyContribution);

  }, [startingSavings, decadeOneMonthlyContribution, decadeTwoMonthlyContribution, decadeThreeMonthlyContribution, 
    decadeOneAge, decadeTwoAge, decadeThreeAge, 
    decadeOneEnabled, decadeTwoEnabled, decadeThreeEnabled]);

  return (
    <canvas id="piechart" ref={canvasRef}></canvas>
  );
};

export default PieChartComponent;
