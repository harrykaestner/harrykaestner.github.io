const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=739476ad4754b9969a96d0127fc157a7";
fetch(forecastURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        
        const peaksforecast = jsObject.list.filter(x =>
            x.dt_txt.includes(`18:00:00`));

        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = 0;
        peaksforecast.forEach(forecast => {
            let d = new Date(forecast.dt_txt);
            document.getElementById(`weekday${day+1}`).textContent = weekdays[d.getDay()];
            day++;
        });

        for (let i = 0; i < peaksforecast.length; i++) {
            const imagesrc = 'https://openweathermap.org/img/w/' + peaksforecast[i].weather[0].icon + '.png';
            const desc = peaksforecast[i].weather[0].description;
            let image = document.createElement('img');
            let imageTD = document.getElementById(`icon${i+1}`);
            image.setAttribute('src', imagesrc);
            image.setAttribute('alt', desc);
            imageTD.appendChild(image);
            document.getElementById(`day${i+1}`).innerHTML = `${Math.round(peaksforecast[i].main.temp)} &#8457`;
        }
        
});