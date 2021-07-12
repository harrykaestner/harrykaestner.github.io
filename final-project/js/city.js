// city.js

const MAX_EVENTS = 5;

async function init() {
  // events stuff
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

  bindLazyload();
}

window.addEventListener('load', init);
