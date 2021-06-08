// Code for get date in a nice format
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let dateNum = date.getDate();
let dayNum = parseInt(date.getDay());

document.getElementById("currentDate").innerHTML = days[dayNum] + ", " + dateNum + " " + months[month] + " " + year + ".";

// Code for responsive navigation
const hamButton = document.querySelector('#hamBtn');
const navigation = document.querySelector('.navigation');
hamButton.addEventListener('click', () => { navigation.classList.toggle('appear') }, false);

// If the actual day is Friday displays the banner
if (dayNum == 5){
    let aside = document.getElementById("aside");
    aside.style.display = "block";
}

//indicates the current range value from 1 to 10
function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}