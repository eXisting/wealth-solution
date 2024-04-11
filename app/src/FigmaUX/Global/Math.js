
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


function setSmallestCombination(desiredResult, startingSavings, stageEnabled1, stageEnabled2, stageEnabled3) {
  if (desiredResult <= startingSavings)
  {
      // updateDecadeAge(1, 0);
      // updateDecadeMonthlyContribution(1, 0);

      // updateDecadeAge(2, 0);
      // updateDecadeMonthlyContribution(2, 0);

      // updateDecadeAge(3, 0);
      // updateDecadeMonthlyContribution(3, 0);

      return;
  }

  let savingPeriod = 40;

  if (startingSavings >= desiredResult * 0.01)
    savingPeriod = 20;

  let decadeOneEnabled = stageEnabled1;
  let decadeTwoEnabled = stageEnabled2;
  let decadeThreeEnabled = stageEnabled3;

  let first = [0, 0];
  let calculatedInFirst = startingSavings;
  if (decadeOneEnabled) {
    let firstPeriod = decadeTwoEnabled && decadeThreeEnabled ?
      Math.floor(savingPeriod * 0.13) :
      decadeTwoEnabled ^ decadeThreeEnabled ?
      Math.floor(savingPeriod * 0.38) :
      savingPeriod;

      let firstResult = decadeTwoEnabled && decadeThreeEnabled ?
      desiredResult * 0.01 :
      decadeTwoEnabled ^ decadeThreeEnabled ?
      desiredResult * 0.05 :
      desiredResult;

    first = calculateContribution(firstResult, startingSavings, firstPeriod);
    calculatedInFirst = calculateSavings(first[1], first[0], startingSavings);
  }

  let second = [0, 0];
  let calculatedInSecond = calculatedInFirst;
  if (calculatedInFirst < desiredResult && decadeTwoEnabled){

    let secondPeriod = decadeOneEnabled && decadeThreeEnabled ?
      Math.floor(savingPeriod * 0.38) :
      decadeOneEnabled ?
      savingPeriod - first[0] :
      decadeThreeEnabled ?
      Math.floor(savingPeriod * 0.38) :
      savingPeriod;


    let secondResult = decadeOneEnabled && decadeThreeEnabled ?
      desiredResult * 0.11 :
      decadeOneEnabled ?
      desiredResult :
      decadeThreeEnabled ?
      desiredResult * 0.11 :
      desiredResult;

    second = calculateContribution(secondResult, calculatedInFirst, secondPeriod);
    calculatedInSecond = calculateSavings(second[1], second[0], calculatedInFirst);
  }

  let third = [0, 0];
  if (calculatedInSecond < desiredResult && decadeThreeEnabled){
    let thirdPeriod = savingPeriod - first[0] - second[0];

    third = calculateContribution(desiredResult, calculatedInSecond, thirdPeriod);
  }

  // updateDecadeAge(1, first[0]);
  // updateDecadeMonthlyContribution(1, first[1]);

  // updateDecadeAge(2, second[0]);
  // updateDecadeMonthlyContribution(2, second[1]);

  // updateDecadeAge(3, third[0]);
  // updateDecadeMonthlyContribution(3, third[1]);

  // recalculateTotalContributions();
};

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

export {calculateSavings, setSmallestCombination, calculateMinimumYearsForFutureValue, calculateContribution};