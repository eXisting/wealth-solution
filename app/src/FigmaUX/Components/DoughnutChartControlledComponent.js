import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { calculateSavings } from '../Global/Math';

function draw(canvas, monthlyContributions, initialSavings, years, isMobile, isTablet) {

  const monthsInYear = 12;
  const totalSaved = calculateSavings(monthlyContributions, years, initialSavings, 10);
  const totalContributions = monthlyContributions * monthsInYear * years;

  var data = {
    labels: ['Contribution', 'Total Saved'],
    datasets: [{
      data: [totalContributions, totalSaved],
      backgroundColor: ['#33CBCC', '#4A7DE2'],
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

const DoughnutChartControlledComponent = ({years, monthlyContributions, initialSavings, isMobile, isTablet}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    draw(canvas, monthlyContributions, initialSavings, years, isMobile, isTablet);

  }, [years, monthlyContributions, initialSavings, isMobile, isTablet]);

  return (
    <canvas id="piechart" ref={canvasRef}></canvas>
  );
};

export default DoughnutChartControlledComponent;
