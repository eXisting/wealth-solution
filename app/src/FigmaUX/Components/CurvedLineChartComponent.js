import React, { useEffect, useRef } from 'react';
import { currentDate, formatCurrency, trimToInt } from '../Global/Global';
import { Chart, Tooltip } from 'chart.js/auto';
import { calculateSavings } from '../Global/Math';

const generateYearsCheckpoints = (years, stepYears) => {
  let array = new Array (years / stepYears + 1);

  for (let i = 0; i < array.length; i++) {
      array[i] = (stepYears * i).toString();
  }

  return array;
};

const savingsCheckpoints = (years, stepYears, initialSavings, monthlyContribution) => {
  let yearsCheckpoints = generateYearsCheckpoints(years, stepYears);
  let array = new Array (years / stepYears + 1);
  
  let monthInYear = 12;

  array[0] = initialSavings + (monthlyContribution * monthInYear);
  for (let i = 1; i < array.length; i++) {
      array[i] = calculateSavings(monthlyContribution, yearsCheckpoints[i], initialSavings, 10);
  }

  return array;
}

const contributionsCheckpoints = (years, stepYears, monthlyContribution) => {
  let yearsCheckpoints = generateYearsCheckpoints(years, stepYears);
  let array = new Array (years / stepYears + 1);
  
  let monthInYear = 12;

  array[0] = monthlyContribution * monthInYear;
  for (let i = 1; i < array.length; i++) {
      array[i] = yearsCheckpoints[i] * monthInYear * monthlyContribution;
  }

  return array;
}

function draw(canvas, data, options) {
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

const CurvedLineChartComponent = ({years, step, monthlyContributions, initialSavings, isMobile, isTablet}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    var data = {
        labels: generateYearsCheckpoints(years, step),
        datasets: [
            {
                label: 'Contributions',
                data: contributionsCheckpoints(years, step, monthlyContributions),
                backgroundColor: '#33CBCC',
                borderRadius: 40,
                maxBarThickness: 12,
            },
            {
                label: 'Total saved',
                data: savingsCheckpoints(years, step, initialSavings, monthlyContributions),
                backgroundColor: '#4A7DE2',
                borderRadius: 40,
                maxBarThickness: 12,
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
                grid: {
                    display: false,
                  },
                min: 0,
                max: 40,
                ticks: {
                    stepSize: step,
                    callback: value => {
                        return step == 1 ? '' : ((value - 1) * step) + currentDate().getFullYear();
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

    draw(canvas, data, options);

  }, [monthlyContributions, initialSavings, step, years]);

  return <canvas id="linechart" ref={canvasRef}></canvas>;
};

export default CurvedLineChartComponent;
