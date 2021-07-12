// directory.js

async function init() {
  // companies stuff
  const companies = await getCompanies();
  companies.forEach((c) => {
    document.querySelector('.directory > ul').appendChild(createCompanyCard(c));
  });

  bindLazyload();
}

window.addEventListener('load', init);
