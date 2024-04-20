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

function calculateEndYear(years) {
  let year = currentDate().getFullYear();
  year += years;

  return year;
}

function totalEnabledYears(age1, age2, age3, stage1Enabled, stage2Enabled, stage3Enabled) {
  let year = 0;
  if (stage1Enabled) {
    if (age1 === 0)
      age1 = 1;

    year += Number(age1);
  }

  if (stage2Enabled) {
    if (age2 === 0)
      age2 = 1;

    year += Number(age2);
  }

  if (stage3Enabled) {
    if (age3 === 0)
      age3 = 1;

    year += Number(age3);
  }

  return year;
}

export {trimToInt, formatCurrency, currentDayFormatted, currentDate, totalEnabledYears, calculateEndYear};