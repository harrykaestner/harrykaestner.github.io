// Code for get date in a nice format
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = 0;
peaksforecast.forEach(forecast => {
    let d = new Date(forecast.dt_txt);
    document.getElementById(`weekday${day+1}`).textContent = weekdays[d.getDay()];
    day++;

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let dateNum = date.getDate();
let dayNum = date.getDay();

let day;
for (let i = 0; i < days.length - 1; i++) {
    if (i == dayNum) {
        day = days[i];
    }
}
document.getElementById("currentDate").innerHTML = day + ", " + dateNum + " " + months[month] + " " + year + ".";

// Code for responsive navigation
const hamButton = document.querySelector('#hamBtn');
const navigation = document.querySelector('.navigation');
hamButton.addEventListener('click', () => { navigation.classList.toggle('appear') }, false);

// If the actual day is Friday displays the banner
if (day == "Friday"){
    let aside = document.getElementById("aside");
    aside.style.display = "block";
}

//get all images
let imagesToLoad = document.querySelectorAll("img[data-src]");

//changes the path from data-src to src
const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    }
}

//verify if intersection observer is supported
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });

    //iterate to each imgs
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });

    //load all imgs
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}
