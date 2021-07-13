function init() {
  // dynamically set dates on page
  document.querySelector(
    '.copyright-year'
  ).innerHTML = new Date().getFullYear();
  document.querySelector('.updated').innerHTML = new Intl.DateTimeFormat(
    'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  ).format(new Date(document.lastModified));

  // add menu event handler
  const openMenuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav');

  openMenuToggle.addEventListener(
    'click',
    () => {
      navMenu.classList.toggle('open');
      openMenuToggle.innerHTML = navMenu.classList.contains('open')
        ? '&#10005; Close'
        : '&#9776; Menu';
    },
    false
  );

  window.onresize = () => {
    if (window.innerWidth > 761) {
      navMenu.classList.remove('open');
      openMenuToggle.innerHTML = '&#9776; Menu';
    }
  };
}

window.addEventListener('load', init);
