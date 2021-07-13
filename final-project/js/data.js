// data.js

// weather Rexburg
async function getWeather() {
  const API_ID = '739476ad4754b9969a96d0127fc157a7';
  const LAT = '43.826';
  const LON = '-111.7897';
  const EXCLUDE = 'minutely,hourly';

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=43.826&lon=-111.7897&exclude=minutely,hourly&appid=739476ad4754b9969a96d0127fc157a7&units=imperial`;
  const response = await fetch(url);
  const data = await response.json();

  const { temp, humidity, description, icon, date } = extractWeatherData(
    data.current
  );
  const forecast = data.daily.slice(1).map(extractWeatherData);
  const alerts = data.alerts.map((x) => x.event);

  return { temp, humidity, description, icon, date, forecast, alerts };
}

function extractWeatherData(data) {
  const {
    temp,
    humidity,
    weather: [{ description, icon }],
    dt,
  } = data;

  return {
    temp: typeof temp === 'number' ? temp : temp.day,
    date: new Date(dt * 1000),
    humidity,
    description,
    icon,
  };
}

// events list
async function getEvents() {
  const url = `data/events.json`;
  const response = await fetch(url);
  const { data } = await response.json();
  return data;
}

// companies list
async function getCompanies() {
  const url = `data/companies.json`;
  const response = await fetch(url);
  const { data } = await response.json();
  return data;
}
