//Last Visit
const footer = document.querySelector('footer');

function timeSinceLastVisit() {
    let lastVisit = localStorage.getItem('date');
    if (!lastVisit) {
        localStorage.setItem('date', Date.now());
        return "This is your first time visiting this page!";
    } else {
        const daysSinceLastVisit = Math.round(Math.abs((parseInt(lastVisit) - Date.now()) / (1000 * 3600 * 24)));
        localStorage.setItem('date', Date.now());
        if (daysSinceLastVisit == 1) {
            return `It has been ${daysSinceLastVisit} day since your last visit!`;
        } else {
            return `It has been ${daysSinceLastVisit} days since your last visit!`;
        }
        
    }
}

footer.innerHTML = timeSinceLastVisit();


