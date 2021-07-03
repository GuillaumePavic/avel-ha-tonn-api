const fetch = require('node-fetch');
const moment = require('moment');
//47.753772, -3.517549
//2018-11-23T10%3A00%3A00%2B00%3A00
//'2021-06-09T00%3A00%3A00%2B003A00'
//'2021-06-09T02%3A00%3A00%2B00%3A00'

const fetchStormGlass = () => {
let date = moment.now();
date = moment(date).format();
}
//48.623035, 1.814428
const lat = 48.623035;
const lng = 1.814428;
//const lat = 47.7537;
//const lng = -3.5175;
const params = 'waveHeight,waveDirection,airTemperature';

fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=2021-06-28T14%3A00%3A00%2B00%3A00&end=2021-06-28T20%3A45%3A00%2B00%3A00`, {
  headers: {
    'Authorization': 'e95591fc-c895-11eb-8d12-0242ac130002-e9559288-c895-11eb-8d12-0242ac130002'
  }
}).then((response) => response.json())
  .then((jsonData) => {
  //console.log(jsonData.hours.length);
  console.log(jsonData.hours);
  //console.log(jsonData.hours[0].waveHeight);
})
.catch(error => console.log(error));

//'2021-06-28T20:00:00+00:00'