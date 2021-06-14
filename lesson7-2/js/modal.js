        // check to see if there is a name in local memory
        if (name != null) {
            // get a random int between 0 and the length of the array
            let getNum = Math.floor(Math.random() * greetingArray.length);
            // addes the text to the welcome banner
            b.textContent = `Hey ${name}, ${greetingArray[getNum]}! It's been ${compareDateTime()} days since your last visit.`;
            // unhides the welcome banner
            b.classList.remove('hidden');
        } else {
            // just adds a day count if there was no name entered
            b.textContent = `Hey, it's been ${compareDateTime()} days since your last visit.`;
            // unhides the welcome banner
            b.classList.remove('hidden');
        }
     
    // triggers the modal to open / close
    function triggerModal() {
        document.getElementsByClassName('modal')[0].classList.toggle('hidden');
        document.getElementById('modal-feedback').innerHTML = '';
    }
    
    // listens for clicks and closes the name modal
    document.getElementsByClassName('close-modal')[0].addEventListener('click', function() {
        triggerModal();
    });
    document.getElementsByClassName('close-modal')[1].addEventListener('click', function() {
        triggerModal();
    });
    
    // adds date to local memory
    function addDateLocal() {
        // creates var for current date/time
        let dateTime = new Date();
        // adds visit time to local storage
        localStorage.setItem('lastVisitDate', dateTime);
    }
    
    // compares the stored and current date
    function compareDateTime() {
        // gets value of stored date
        let storedDate = localStorage.getItem('lastVisitDate');
    
        // ** this is here to test functionality of past dates ** //
        // storedDate = new Date('06/03/2020');
    
        if (storedDate != null) {
            // convert stored date to an active date
            let convertedStoredDate = new Date(storedDate);
            // gets current date / time
            let currentDate = new Date();
            // gets difference between old and new dates
            let diff = currentDate.getTime() - convertedStoredDate.getTime();
            // reset the local (last visit) date
            addDateLocal();
            // returns number of days difference, rounded down
            return Math.floor(diff / (1000 * 3600 * 24));
        } else {
            // set the local (last visit) date
            addDateLocal();
            return 0;   
        }
    }
    
    // function adds users name to local memory
    function addNameLocal() {
        let nameEntered = document.getElementById('modal-name-input').value.trim();
        // if a valid name is entered, add it to local memory
        if (nameEntered != "") {
            // adds name to local storage
            localStorage.setItem('uName', nameEntered);
            // name saved growl
            document.getElementById('modal-feedback').innerHTML = '<span class="green">name saved<span>';
            // calls banner function
            welcomeBanner(nameEntered);
        } else {
            // name not valid growl
            document.getElementById('modal-feedback').innerHTML = '<span class="red">enter a valid name<span>';
        }
    }