// factory.js

function createWeatherTile(
  { temp, humidity, description, icon, date },
  { elementType = 'div', size = 'normal', dateFormat = { weekday: 'short' } }
) {
  const tileEl = document.createElement(elementType);
  tileEl.classList = `weather-tile ${size}`;

  const dateEl = document.createElement('h3');
  dateEl.textContent = date.toLocaleString('en-us', dateFormat);
  tileEl.appendChild(dateEl);

  const iconEl = document.createElement('img');
  iconEl.setAttribute('src', 'images/placeholder.png');
  iconEl.setAttribute(
    'data-src',
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconEl.setAttribute('alt', ``);
  iconEl.setAttribute('width', 100);
  iconEl.setAttribute('height', 100);
  tileEl.appendChild(iconEl);

  const descEl = document.createElement('p');
  descEl.innerHTML = `${Math.round(temp)}&deg; ${description}`;
  tileEl.appendChild(descEl);

  const humidityEl = document.createElement('p');
  humidityEl.textContent = `${humidity}% humidity`;
  tileEl.appendChild(humidityEl);

  return tileEl;
}

function createEventItem({ date, event }) {
  const prettyDate = new Date(date).toLocaleString('en-us', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const eventEl = document.createElement('li');
  eventEl.innerHTML = `${prettyDate}<br /><strong>${event}</strong>`;

  return eventEl;
}

function createCompanyCard({ name, logo, url }) {
  const companyCard = document.createElement('li');

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noreferrer');
  companyCard.appendChild(link);

  const img = document.createElement('img');
  img.setAttribute('src', 'images/placeholder.png');
  img.setAttribute('data-src', `images/logos/${logo}`);
  img.setAttribute('alt', `${name} logo`);
  link.appendChild(img);

  return companyCard;
}
