import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = ({ toYears, stepYears, compoundingInterest, monthlySavings, defaultMaxY }) => {

    const formatTickValue = (value) => {
        return `$${value.toLocaleString()}`
    };

    const generateYearsCheckpoints = () => {
        let array = new Array (toYears / stepYears + 1);

        for (let i = 0; i < array.length; i++) {
            array[i] = (stepYears * i).toString();
        }

        return array;
    };

    const calculateSavings = (yearsInterval) => {
        const r = parseFloat(compoundingInterest) / 100;
        const n = 12;
    
        const futureValue = monthlySavings * ((Math.pow(1 + (r / n), n * yearsInterval) - 1) / (r / n));
    
        const saved = Math.round(futureValue);
        
        return saved;
    };
    
    const savingsCheckpoints = () => {
        let yearsCheckpoints = generateYearsCheckpoints();
        let array = new Array (toYears / stepYears + 1);

        for (let i = 0; i < array.length; i++) {
            array[i] = calculateSavings(yearsCheckpoints[i]);
        }

        return array;
    }

    const contributionsCheckpoints = () => {
        let yearsCheckpoints = generateYearsCheckpoints();
        let array = new Array (toYears / stepYears + 1);
        let monthInYear = 12;

        for (let i = 0; i < array.length; i++) {
            array[i] = yearsCheckpoints[i] * monthInYear * monthlySavings;
        }

        return array;
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            position: "top",
            labels: {
                filter: (legendItem, chartData) => {
                  return legendItem.text !== 'Hidden';
                },
            }
        },
        },
        scales: {
            y: {
              ticks: {
                callback: formatTickValue,
              },
            },
          },
    };
  
    const data = {
        labels: generateYearsCheckpoints(),
        datasets: [
        {
            label: 'Contributions',
            data: contributionsCheckpoints(),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderWidth: 2,
            borderJoinStyle: 'round',
            pointRadius: 0,
            tension: 0.2,
        },
        {
            label: 'Total Saved',
            data: savingsCheckpoints(),
            borderColor: 'rgb(18, 204, 46)',
            backgroundColor: 'rgba(18, 204, 46, 0.5)',
            borderWidth: 2,
            borderJoinStyle: 'round',
            pointRadius: 0,
            tension: 0.2,
        },
        {
            label: 'Hidden',
            data: [defaultMaxY],
            borderColor: 'rgba(18, 204, 46, 0)',
            backgroundColor: 'rgba(18, 204, 46, 0)',
            borderWidth: 0,
            borderJoinStyle: 'round',
            pointRadius: 0,
            tension: 0.2,
        },
    ],
  };

  return (<Line data={data} options={options} />);
};

export default Graph;