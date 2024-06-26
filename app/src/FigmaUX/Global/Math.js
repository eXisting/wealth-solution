
function calculateSavings(contribution, years, savings, compoundInterest = 10) {
  if (savings === 0 && contribution === 0) {
    return 0;
  }

  const r = parseFloat(compoundInterest) / 100;
  const n = 12;

  var t = years;
  var P = parseFloat(savings.toString().replace(/[^0-9]/g, ''));

  const futureValue = P * Math.pow(1 + (r / n), n * t) + contribution * ((Math.pow(1 + (r / n), n * t) - 1) / (r / n));

  return Math.round(futureValue);
};

function setSmallestCombination(desiredResult, startingSavings, stageEnabled1, stageEnabled2, stageEnabled3) {
  if (desiredResult <= startingSavings) {
    return [
      { age: 0, contribution: 0 },
      { age: 0, contribution: 0 },
      { age: 0, contribution: 0 }
    ];
  }

  let savingPeriod = 30;

  if (startingSavings >= desiredResult * 0.01) {
    savingPeriod = 15;
  }

  let decadeOneEnabled = stageEnabled1;
  let decadeTwoEnabled = stageEnabled2;
  let decadeThreeEnabled = stageEnabled3;

  let first = [0, 0];
  let calculatedInFirst = startingSavings;
  if (decadeOneEnabled) {
    let firstPeriod = Math.min(Math.floor(savingPeriod * 0.13), 10);
    let firstResult = desiredResult * 0.01;
    first = calculateContribution(firstResult, startingSavings, firstPeriod);
    calculatedInFirst = calculateSavings(first[1], first[0], startingSavings);
  }

  let second = [0, 0];
  let calculatedInSecond = calculatedInFirst;
  if (calculatedInFirst < desiredResult && decadeTwoEnabled) {
    let secondPeriod = Math.min(Math.floor(savingPeriod * 0.3), 10);
    let secondResult = desiredResult * 0.11;
    second = calculateContribution(secondResult, calculatedInFirst, secondPeriod);
    calculatedInSecond = calculateSavings(second[1], second[0], calculatedInFirst);
  }

  let third = [0, 0];
  if (calculatedInSecond < desiredResult && decadeThreeEnabled) {
    let thirdPeriod = Math.min(savingPeriod - first[0] - second[0], 10);
    third = calculateContribution(desiredResult, calculatedInSecond, thirdPeriod);
  }

  return [
    { age: first[0], contribution: first[1] },
    { age: second[0], contribution: second[1] },
    { age: third[0], contribution: third[1] }
  ];
}

function setDefaultCombination(desiredResult, startingSavings, stageEnabled1, stageEnabled2, stageEnabled3) {
  if (desiredResult <= startingSavings) {
    return [
      { age: 0, contribution: 0 },
      { age: 0, contribution: 0 },
      { age: 0, contribution: 0 }
    ];
  }

  let savingPeriod = 30;

  let decadeOneEnabled = stageEnabled1;
  let decadeTwoEnabled = stageEnabled2;
  let decadeThreeEnabled = stageEnabled3;

  let first = [0, 0];
  let calculatedInFirst = startingSavings;
  if (decadeOneEnabled) {
    let firstPeriod = 10;
    let firstResult = startingSavings > desiredResult * 0.01 ? desiredResult * 0.08 : desiredResult * 0.045;
    first = !decadeThreeEnabled && !decadeTwoEnabled
      ? calculateContribution(desiredResult, startingSavings, firstPeriod)
      : calculateContribution(!decadeTwoEnabled || !decadeThreeEnabled
        ? firstResult * 4 : firstResult, startingSavings, firstPeriod);
    calculatedInFirst = calculateSavings(first[1], first[0], startingSavings);
  }

  let second = [0, 0];
  let calculatedInSecond = calculatedInFirst;
  if (calculatedInFirst < desiredResult && decadeTwoEnabled) {
    let secondPeriod = 10;
    let secondResult = startingSavings > desiredResult * 0.01 ? desiredResult * 0.28 : desiredResult * 0.25;
    second = decadeThreeEnabled
      ? calculateContribution(secondResult, calculatedInFirst, secondPeriod)
      : calculateContribution(desiredResult, calculatedInFirst, secondPeriod);
    calculatedInSecond = calculateSavings(second[1], second[0], calculatedInFirst);
  }

  let third = [0, 0];
  if (calculatedInSecond < desiredResult && decadeThreeEnabled) {
    let thirdPeriod = 10;
    third = calculateContribution(desiredResult, calculatedInSecond, thirdPeriod);
  }

  return [
    { age: first[0], contribution: first[1] },
    { age: second[0], contribution: second[1] },
    { age: third[0], contribution: third[1] }
  ];
}

function calculateMinimumYearsForFutureValue(futureValue, principal, maxContribution, desiredResult) {
  let maxYears = 15;
  const n = 12; // Compounding frequency per year
  const r = 10 / 100; // Convert rate to decimal form

  for (let years = 1; years <= maxYears; years++) {
      const compoundTerm = Math.pow(1 + r / n, n * years);
      const contributionPart = principal * compoundTerm;

      if (contributionPart >= desiredResult) {
          return years;
      }

      if (years === maxYears) {
          maxYears ++;
      }
  }

  return 0;
}

function calculateContribution(futureValue, principal, maxYears, desiredResult) {
  const compoundingFrequency = 12;
  const annualInterest = 10 / 100;

  const compoundCoefficient = Math.pow(1 + annualInterest/compoundingFrequency, compoundingFrequency * maxYears);
  let contribution = Math.ceil((futureValue - principal * compoundCoefficient) * (annualInterest/compoundingFrequency) / (compoundCoefficient - 1));

  if (contribution <= 0)
  {
    let minYears = calculateMinimumYearsForFutureValue(futureValue, principal, 10000, desiredResult);

    return [futureValue === desiredResult ? minYears : 0, 0];
  }

  return [maxYears, contribution];
}

export {calculateSavings, setSmallestCombination, setDefaultCombination, calculateMinimumYearsForFutureValue, calculateContribution};