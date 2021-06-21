// Code for get date in a nice format
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

//array for forecast days
const weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
let nextdayList = [dayNum + 1, dayNum + 2, dayNum + 3, dayNum + 4, dayNum + 5];

for (let i = 0; i < nextdayList.length; i++) {
    if (nextdayList[i] % 7 == 0) {
        nextdayList[i] = 0;
    } else if (nextdayList[i] % 7 == 1) {
        nextdayList[i] = 1;
    } else if (nextdayList[i] % 7 == 2) {
        nextdayList[i] = 2;
    } else if (nextdayList[i] % 7 == 3) {
        nextdayList[i] = 3;
    } else if (nextdayList[i] % 7 == 4) {
        nextdayList[i] = 4;
    } else if (nextdayList[i] % 7 == 5) {
        nextdayList[i] = 5;
    } else {
        nextdayList[i] = 6;
    }
}

let day1 = document.getElementById("nameDay1").innerText = weekday[nextdayList[0]];
let day2 = document.getElementById("nameDay2").innerText = weekday[nextdayList[1]];
let day3 = document.getElementById("nameDay3").innerText = weekday[nextdayList[2]];
let day4 = document.getElementById("nameDay4").innerText = weekday[nextdayList[3]];
let day5 = document.getElementById("nameDay5").innerText = weekday[nextdayList[4]];

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

// API Consult
const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonObject) {
        console.table(jsonObject);
        const towns = jsonObject['towns'];

        for (let i = 0; i < towns.length; i++) {

            if (towns[i].name == "Preston" || towns[i].name == "Fish Haven" || towns[i].name == "Soda Springs") {
                let card = document.createElement('section');
                let h2 = document.createElement('h2');
                let h4 = document.createElement('h4');
                let yearFounded = document.createElement('p');
                let population = document.createElement('p');
                let rainfall = document.createElement('p');
                let img = document.createElement('img');

                h2.textContent = towns[i].name;
                h4.textContent = towns[i].motto;
                yearFounded.textContent = "Year Founded: " + towns[i].yearFounded;
                population.textContent = "Population: " + towns[i].currentPopulation;
                rainfall.textContent = "Annual Rain fall: " + towns[i].averageRainfall;
                img.setAttribute('src', "images/" + towns[i].photo);
                img.setAttribute('alt', "a nice photo of " + towns[i].name);

                card.appendChild(h2);
                card.appendChild(h4);
                card.appendChild(yearFounded);
                card.appendChild(population);
                card.appendChild(rainfall);
                card.appendChild(img);

                document.querySelector('div.cards').appendChild(card);
            }
        }

    });