import React, { useEffect, useRef } from 'react';
import { currentDate, totalEnabledYears, totalYears } from '../Global/Global';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { totalSavingsPerContributions } from '../Global/ChartsMath';
import { calculateSavings } from '../Global/Math';

function draw(canvas, monthlyContributions, initialSavings, years, endYear) {

  const monthsInYear = 12;
  const totalSaved = calculateSavings(monthlyContributions, years, initialSavings, 10);
  const totalContributions = monthlyContributions * monthsInYear * years;

  var data = {
    labels: ['Total Saved', 'Contribution'],
    datasets: [{
      data: [totalSaved, totalContributions],
      backgroundColor: ['#0098ff', '#60d937'],
    }],
  };
  
  var options = {
      plugins: {
          title: {
              display: true,
              text: 'Investment Balance at Year ' + (endYear),
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

function calculateEndYear(years) {
  let year = currentDate().getFullYear();
  year += years;

  return year;
}

const PieChartControlledComponent = ({years, monthlyContributions, initialSavings}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const endYear = calculateEndYear(years);

    draw(canvas, monthlyContributions, initialSavings, years, endYear);

  }, [years, monthlyContributions, initialSavings]);

  return (
    <canvas id="piechart" ref={canvasRef}></canvas>
  );
};

export default PieChartControlledComponent;
