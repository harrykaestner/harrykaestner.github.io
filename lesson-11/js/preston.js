const url = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(url)
  .then((response) => response.json())
  .then((jsObject) =>{

    const list = document.getElementById('listEvents');

    for(let i = 0; i < jsObject.towns.length; i++){
      
      if (jsObject.towns[i].name == "Preston") {
        
        for (let j = 0; j < jsObject.towns[i].events[j].length; j++) {
          
          let event = document.createElement('li');
          event.textContent = jsObject.towns[i].events[j];
          list.appendChild(event);
          console.log(jsObject.towns[i].events[j]);
          
        }

      }
      
    }
  });