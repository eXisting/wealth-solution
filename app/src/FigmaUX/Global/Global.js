function removeNonNumbers(value) {
  const numericValue = value.toString().replace(/[^0-9]/g, '');
  return Number(numericValue);
}

function formatCurrency(sign, signAtTheEnd, value) {
  const parsedValue = removeNonNumbers(value);

  if (sign === undefined) return parsedValue;
  if (signAtTheEnd) return `${parsedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${sign}`;
  return `${sign}${parsedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

function currentDayFormatted() {
  const date = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options).toUpperCase();
}

export {removeNonNumbers, formatCurrency, currentDayFormatted};