import { trimToInt } from "./Global";
import { calculateSavings } from "./Math";

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
  if (isNaN(contributions2)) 
      contributions2 = 0;
  if (isNaN(contributions3)) 
      contributions3 = 0;

    
  const total1 = calculateSavings(contributions1, age1, startingSavings);
  const total2 = calculateSavings(contributions2, age2, total1);    
  const total3 = calculateSavings(contributions3, age3, total2); 

  const months = 12;

  const contributionsTotal1 = contributions1 * age1 * months;
  const contributionsTotal2 = contributions2 * age2 * months;
  const contributionsTotal3 = contributions3 * age3 * months;

  let results = [
    {total1, contributionsTotal1},
    {total2, contributionsTotal2},
    {total3, contributionsTotal3},
  ];

  return results;
}

function generateYearsCheckpoints(totalYears) {
  let array = new Array(totalYears).fill(0);

  for (let i = 0; i < array.length; i++) {
      array[i] = i + 1;
  }

  return array;
};

function savingsCheckpoints(yearsCheckpoints, totalYears, startingSavings, 
  age1, age2, age3, 
  stageEnabled1, stageEnabled2, stageEnabled3,
  contribution1, contribution2, contribution3) {
  let array = new Array(totalYears).fill(0);

  var firstStageResult = [0, startingSavings];
  if (stageEnabled1) {
      let bound = Number(age1);

      if (bound !== 0) {
        for (let i = 0; i < bound; i++) {
            array[i] = calculateSavings(trimToInt(contribution1), yearsCheckpoints[i], startingSavings);
        }

        firstStageResult = [bound, array[bound - 1]];
      }
  }

  console.log(firstStageResult);
  
  var secondStageResult = [firstStageResult[0], firstStageResult[1]];
  
  if (stageEnabled2) {
      let bound = Number(age2);
      
      if (bound !== 0) {
        for (let i = 0, j = firstStageResult[0]; i < bound; i++, j++) {
          array[j] = calculateSavings(trimToInt(contribution2), yearsCheckpoints[i], firstStageResult[1]);
        }

        secondStageResult = [bound + firstStageResult[0], array[bound + firstStageResult[0] - 1]];
      }
  }

  console.log(secondStageResult);
  
  if (stageEnabled3) {
      let bound = Number(age3);
      
      for (let i = 0, j = secondStageResult[0]; i < bound; i++, j++) {
          
          array[j] = calculateSavings(trimToInt(contribution3), yearsCheckpoints[i], secondStageResult[1]);
      }
  }

  return array;
}    

function contributionsCheckpoints(yearsCheckpoints, totalYears, startingSavings, 
  age1, age2, age3, 
  stageEnabled1, stageEnabled2, stageEnabled3,
  contribution1, contribution2, contribution3) {
  let array = new Array(totalYears).fill(0);
  
  let monthInYear = 12;

  var firstStageResult = [0, startingSavings];
  if (stageEnabled1) {
      let bound = Number(age1);
      for (let i = 0; i < bound; i++) {
          array[i] = yearsCheckpoints[i] * trimToInt(contribution1) * monthInYear;
      }

      firstStageResult = [bound, array[bound - 1]];
  }
  
  var secondStageResult = [firstStageResult[0], firstStageResult[1]];
  if (stageEnabled2) {
      let bound = Number(age2);

      for (let i = 0, j = firstStageResult[0]; i < bound; i++, j++) {
          var base = array[j - 1];
          if (j < 1)
              base = 0;

          array[j] = base +  trimToInt(contribution2) * monthInYear;
      }

      secondStageResult = [bound + firstStageResult[0], array[bound + firstStageResult[0] - 1]];
  }
  
  if (stageEnabled3) {
      let bound = Number(age3);

      for (let i = 0, j = secondStageResult[0]; i < bound; i++, j++) {
          var base = array[j - 1];
          if (j < 1)
              base = 0;

          array[j] = base + trimToInt(contribution3) * monthInYear;
      }
  }

  return array;
}

export {generateYearsCheckpoints, savingsCheckpoints, contributionsCheckpoints, totalSavingsPerContributions };