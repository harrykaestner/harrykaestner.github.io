// home.js

const FORECAST_DAYS = 3;
const MAX_EVENTS = 5;
const SPOTLIGHT_COMPANIES = 3;

async function init() {
  // weather 
  const {
    temp,
    humidity,
    description,
    icon,
    date,
    forecast,
    alerts,
  } = await getWeather();

  // load current data
  document.querySelector('.current-weather').appendChild(
    createWeatherTile(
      { temp, humidity, description, icon, date },
      {
        dateFormat: {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      }
    )
  );

  // load forecast
  forecast.slice(0, FORECAST_DAYS).forEach((f) => {
    document.querySelector('.forecast > ul').appendChild(
      createWeatherTile(f, {
        elementType: 'li',
        size: 'small',
      })
    );
  });

  // display alerts if any
  if (alerts.length > 0) {
    document.querySelector('.alert > .msg').innerHTML = `
      &#9888;&#65039; &#9888;&#65039; &#9888;&#65039;
      WEATHER ALERT: ${alerts.join(', ')}
      &#9888;&#65039; &#9888;&#65039; &#9888;&#65039;
    `;
    document.querySelector('.alert').classList.remove('hidden');
    document
      .querySelector('.alert > button')
      .addEventListener('click', (evt) =>
        evt.target.parentNode.classList.add('hidden')
      );
  }

  // events list
  const events = await getEvents();
  events
    .map((e) => {
      const tmpDate = new Date(e.date);
      const newDate = new Date(tmpDate).setFullYear(
        new Date().getFullYear() +
          (tmpDate.getMonth < new Date().getMonth() ? 1 : 0)
      );
      e.date = newDate;
      return e;
    })
    .sort((e1, e2) => e1.date - e2.date)
    .filter((e) => {
      // lets only keep things coming in the next 3 months
      const months = 1000 * 60 * 60 * 24 * 30 * 3;
      const now = Date.now();
      return e.date > now && e.date < now + months;
    })
    .slice(0, MAX_EVENTS)
    .forEach((e) => {
      document
        .querySelector('.upcoming-events > ul')
        .appendChild(createEventItem(e));
    });

  // companies list
  const companies = await getCompanies();
  companies
    .sort(() => Math.random() - 0.5) // really bad shuffle
    .slice(0, SPOTLIGHT_COMPANIES)
    .forEach((c) => {
      document
        .querySelector('.featured > ul')
        .appendChild(createCompanyCard(c));
    });

  bindLazyload();
}

window.addEventListener('load', init);
