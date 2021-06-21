const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=739476ad4754b9969a96d0127fc157a7';

fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
    document.getElementById('curr').innerText = jsObject.weather[0].description;
    document.getElementById('tempH').innerText = jsObject.main.temp_max;
    document.getElementById('hum').innerText = jsObject.main.humidity;
    document.getElementById('wSpeed').innerText = jsObject.wind.speed;
  });


  const apiURLforecast = 'https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=739476ad4754b9969a96d0127fc157a7';
  fetch(apiURLforecast)
    .then((response) => response.json())
    .then((jsObject) => {
      const forecast = jsObject['list'];

      for (let i = 3; i < forecast.length; i += 8) {
        document.getElementById(`imgForecast${i}`).setAttribute('src', "https://openweathermap.org/img/w/" + forecast[i].weather[0].icon + ".png");
        document.getElementById(`tempForecast${i}`).innerText = forecast[i].main.temp;
      }

    });