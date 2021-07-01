const currentRequestURL = 'https://api.openweathermap.org/data/2.5/weather?id=5607916&units=imperial&appid=739476ad4754b9969a96d0127fc157a7';
const fiveDayRequestURL = 'https://api.openweathermap.org/data/2.5/forecast?id=5607916&units=imperial&appid=739476ad4754b9969a96d0127fc157a7';

fetch(currentRequestURL)
  .then((response) => response.json())
  .then((jsObject) => {
    //console.log(jsObject);

    // the current condition description
    let current = jsObject.weather[0].main;
    let _c = document.getElementById('d-current');
    _c.textContent = current;
    // current temperature(s) in Fahrenheit
    let temp = jsObject.main.temp;
    let _t = document.getElementById('d-temp');
    _t.textContent = parseInt(temp);
    // the humidity
    let humidity = jsObject.main.humidity;
    let _h = document.getElementById('d-humid');
    _h.textContent = humidity;
    // the wind speed
    let wind = jsObject.wind.speed;
    let _w = document.getElementById('d-wind-s');
    _w.textContent = wind;

    // calls the windchill function in windchill.js
    windChill();
});

// calculate wind-chill
function windChill() {
    // create vars for the temp and wind speed
    let temp = parseInt(document.querySelector('#d-temp').textContent);
    let windSpeed = parseInt(document.querySelector('#d-wind-s').textContent);
    // var for wind chill
    let windChill = '';
    
    // check to see if windchill should be calculated
    if (temp > 50 || windSpeed < 3) {
        windChill = '-- ';
    // if temp is below 50 and wind speed is more than 3 mph
    } else {
        windChill = parseInt((35.74 + (0.6215 * temp)) -
        (35.75 * Math.pow(windSpeed, 0.16)) + 
        (0.4275 * temp * Math.pow(windSpeed, 0.16)));
    }

    // output the windchill result
    document.querySelector('#d-wind-c').textContent = windChill;
 }

// five day forcest
fetch(fiveDayRequestURL)
  .then((response) => response.json())
  .then((jsObject) => {
    let forcast = jsObject.list;
    // holds the icon & temp objects for the five day
    let fiveDay = [];

    // loops through response
    for(let i = 0; i < forcast.length; i++) {
        // isolates the time
        let time = parseInt(forcast[i].dt_txt.slice(10,13));
        // if the time = 18:00 then add to the fiveDay array
        if(time == 18) {
            // icon and temp obj
            let w = {
                wIcon: forcast[i].weather[0].icon,
                wDesc: forcast[i].weather[0].description,
                wTemp: parseInt(forcast[i].main.temp),
                wDate: forcast[i].dt_txt.slice(0,10)
            };
            // pushes icon and temp object to the fiveDay array
            fiveDay.push(w);
        }
    }
    console.log(fiveDay);
    // loops through the fiveDay array and outputs the data to the page
    for(let i = 0; i < fiveDay.length; i++) {
        // set value for content output
        let o_icon = `https://openweathermap.org/img/w/${fiveDay[i].wIcon}.png`;
        let o_desc = fiveDay[i].wDesc;
        let o_temp = fiveDay[i].wTemp;
        let o_date = fiveDay[i].wDate;
        // get html elements
        let dayOutput = document.getElementById('day-output');
        let weatherOutput = document.getElementById('weather-output');

        // create elements
        let dayTh = document.createElement('th');

        // creates weather information content
        let weatherInfo = 
        `<td class="forecast-info">
            <img src="${o_icon}" alt="${o_desc}" class="w-icon">
            <span>${o_temp} &#176;F</span>
        </td>`;

        // add content to elements
        dayTh.textContent = calcDayOfWeek(o_date);

        // add elements to html
        dayOutput.appendChild(dayTh);
        weatherOutput.insertAdjacentHTML('beforeend', weatherInfo);
    }

    // returns a long string day of week based on date
    function calcDayOfWeek(date) {
        let dayOfWeek = new Date(date).toLocaleString('en-us', {weekday: 'long'});
        return dayOfWeek;
    }
});