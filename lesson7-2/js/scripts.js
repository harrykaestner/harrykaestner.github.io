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

   //Last visit
            var days = 730; // days until cookie expires = 2 years.
            var lastvisit=new Object();
            var firstvisitmsg="This is your first visit to this page. Welcome!"; 
            lastvisit.subsequentvisitmsg="Welcome back visitor! Your last visit was on <b>[displaydate]</b>";
            
            lastvisit.getCookie=function(Name){ 
            var re=new RegExp(Name+"=[^;]+", "i"); 
            if (document.cookie.match(re)) 
            return document.cookie.match(re)[0].split("=")[1];
            return''; 
            }
            
            lastvisit.setCookie=function(name, value, days){ 
            var expireDate = new Date();
            
            var expstring=expireDate.setDate(expireDate.getDate()+parseInt(days));
            document.cookie = name+"="+value+"; expires="+expireDate.toGMTString()+"; path=/";
            }
            
            lastvisit.showmessage = function() {
            var wh = new Date();
            if (lastvisit.getCookie("visitc") == "") { 
            lastvisit.setCookie("visitc", wh, days); 
            document.write(firstvisitmsg);
            }
            
            else {
            var lv = lastvisit.getCookie("visitc");
            var lvp = Date.parse(lv);
            var now = new Date();
            now.setTime(lvp);
            var day = new Array("Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat");
            var month = new Array ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
            var dd = now.getDate();
            var dy = now.getDay();
            dy = day[dy];
            var mn = now.getMonth();
            mn = month[mn];
            yy = now.getFullYear();
            var hh = now.getHours();
            var ampm = "AM";
            if (hh >= 12) {ampm = "PM"}
            if (hh >12){hh = hh - 12};
            if (hh == 0) {hh = 12}
            if (hh < 10) {hh = "0" + hh};
            var mins = now.getMinutes();
            if (mins < 10) {mins = "0"+ mins}
            var secs = now.getSeconds();
            if (secs < 10) {secs = "0" + secs}
            var dispDate = dy + ", " + mn + " " + dd + ", " + yy + " " + hh + ":" + mins + ":" + secs + " " + ampm
            document.write(lastvisit.subsequentvisitmsg.replace("\[displaydate\]", dispDate))
            }
            
            lastvisit.setCookie("visitc", wh, days);
            
            }
            
            lastvisit.showmessage();
            
            
