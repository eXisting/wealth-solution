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

function totalEnabledYears(age1, age2, age3, stage1Enabled, stage2Enabled, stage3Enabled) {
  let year = 0;
  if (stage1Enabled) {
    year += Number(age1);
  }

  if (stage2Enabled) {
    year += Number(age2);
  }

  if (stage3Enabled) {
    year += Number(age3);
  }

  return year;
}

export {trimToInt, formatCurrency, currentDayFormatted, currentDate, totalEnabledYears};