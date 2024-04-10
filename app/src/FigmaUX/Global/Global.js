function trimToInt(value) {
  const numericValue = value.toString().replace(/[^0-9]/g, '');
  return Number(numericValue);
}

function formatCurrency(sign, signAtTheEnd, value) {
  const parsedValue = trimToInt(value);

  if (sign === undefined) return parsedValue;
  if (signAtTheEnd) return `${parsedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${sign}`;
  return `${sign}${parsedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

function currentDayFormatted() {
  const date = currentDate();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options).toUpperCase();
}

function currentDate() {
  return new Date();
}

function calculateSavings(contribution, years, savings) {
  if (savings === 0 && contribution === 0) {
    return 0;
  }

  const r = parseFloat(10) / 100;
  const n = 12;

  var t = years;
  var P = parseFloat(savings.toString().replace(/[^0-9]/g, ''));

  const futureValue = P * Math.pow(1 + (r / n), n * t) + contribution * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));

  return Math.round(futureValue);
};

function totalSavingsPerContributions(startingAge, age1, age2, age3, startingSavings, 
  contributions1, contributions2, contributions3) {
  if (isNaN(startingAge))
      startingAge = 0;
  if (isNaN(age1)) 
      age1 = 0;
  if (isNaN(age2)) 
      age2 = 0;
  if (isNaN(age3)) 
      age3 = 0;

  if (isNaN(startingSavings))
      startingSavings = 0;
  if (isNaN(contributions1)) 
      contributions1 = 0;
  if (isNaN(contributions3)) 
      contributions2 = 0;
  if (isNaN(contributions3)) 
      contributions3 = 0;

  const total1 = calculateSavings(contributions1, age1, startingSavings);    
  const total2 = calculateSavings(contributions2, age2, total1);    
  const total3 = calculateSavings(contributions3, age3, total2);   

  const contributionsTotal1 = contributions1 * age1 * 12;
  const contributionsTotal2 = contributions2 * age2 * 12;
  const contributionsTotal3 = contributions3 * age3 * 12;

  let results = [
    {total1, contributionsTotal1},
    {total2, contributionsTotal2},
    {total3, contributionsTotal3},
  ];

  return results;
}

export {trimToInt, formatCurrency, currentDayFormatted, currentDate, calculateSavings, totalSavingsPerContributions};