import React, { useEffect, useRef } from 'react';
import { currentDate, formatCurrency, totalEnabledYears, trimToInt } from '../Global/Global';
import { useSelector } from 'react-redux';
import Chart, { Tooltip } from 'chart.js/auto';
import { contributionsCheckpoints, generateYearsCheckpoints, savingsCheckpoints } from '../Global/ChartsMath';

function drawCurvedLineChart(canvas, 
  age1, age2, age3, 
  startingSavings, 
  stageEnabled1, stageEnabled2, stageEnabled3,
  contribution1, contribution2, contribution3) {

  const totalYears = totalEnabledYears(age1, age2, age3, stageEnabled1, stageEnabled2, stageEnabled3);
  
  var yearsCheckpoints = generateYearsCheckpoints(totalYears);
  
  var contributions = contributionsCheckpoints(yearsCheckpoints, totalYears, startingSavings, 
    age1, age2, age3,
    stageEnabled1, stageEnabled2, stageEnabled3,
    contribution1, contribution2, contribution3);

  var savings = savingsCheckpoints(yearsCheckpoints, totalYears, startingSavings, 
    age1, age2, age3,
    stageEnabled1, stageEnabled2, stageEnabled3,
    contribution1, contribution2, contribution3);

  var data = {
      labels: yearsCheckpoints,
      datasets: [
          {
              label: 'Contributions',
              data: contributions,
              backgroundColor: '#33CBCC',
              barThickness: 'flex', 
              borderRadius: 40,
              maxBarThickness: 12,
          },
          {
              label: 'Total saved',
              data: savings,
              backgroundColor: '#4A7DE2',
              barThickness: 'flex',
              borderRadius: 40,
              maxBarThickness: 12,
          },
      ],
  };

  Tooltip.positioners.bottom = function(items) {
    const pos = Tooltip.positioners.average(items);
    if (pos === false) {
        return false;
    }

    const chart = this.chart;

    return {
        x: pos.x,
        y: chart.chartArea.bottom,
        xAlign: 'center',
        yAlign: 'bottom',
    };
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
            grid: {
                display: false,
              },    
            min: 0,
            max: 40,
            ticks: {
                stepSize: 1,
                callback: value => {
                  return (value) + currentDate().getFullYear();
                },
            }
        },
        y: {
            stacked: true,
            grid: {
                display: false,
              },
            beginAtZero: true,
            ticks: {
                callback: value => {
                    let number = trimToInt(value);
                    if (number < 1000000)
                        return formatCurrency('$', undefined, number);
                    return `$${(number / 1000000).toFixed(1)}M`;
                },
            }
        },
    },
    plugins: {
        title: {
            display: false,
        },
        legend: {
            display: false
        },
        tooltip: {
          position: 'bottom'
        }
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
}

const CurvedLineChartControlledComponent = ({decadeOneAge, decadeTwoAge, decadeThreeAge, 
  startingSavings, 
  decadeOneEnabled, decadeTwoEnabled, decadeThreeEnabled,
  decadeOneMonthlyContribution, decadeTwoMonthlyContribution, decadeThreeMonthlyContribution}) => {
  const canvasRef = useRef(null);

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
