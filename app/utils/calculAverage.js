function calculAverage(item) {
    let sum = 0;
    let nbOfValues = 0;

    for(let value in item) {
       sum += item[value];
       nbOfValues++;
    }

    let average = sum / nbOfValues;
    average = Math.round((average + Number.EPSILON) * 100) / 100;

    return average;
}

module.exports = calculAverage;