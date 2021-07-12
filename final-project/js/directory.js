// directory.js

async function init() {
  // Companies List
  const companies = await getCompanies();
  companies.forEach((c) => {
    document.querySelector('.directory > ul').appendChild(createCompanyCard(c));
  });

  bindLazyload();
}

window.addEventListener('load', init);
