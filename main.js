window.addEventListener("load", (result) => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    
    let locationTimezone = document.querySelector('.location-timezone');

    let temperatureSection = document.querySelector('.temperature-section')

    let temperatureSpan = document.querySelector('.degree-type')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {
            long = pos.coords.longitude;
            lat = pos.coords.latitude;
            
            // Solution from stack overflow
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            
            const apiToCall = `${proxyUrl}https://api.darksky.net/forecast/${key}/${lat},${long}`;
            // console.log(apiToCall);

            fetch(apiToCall)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon} = data.currently;
                temperatureDescription.textContent = summary;
                temperatureDegree.textContent = temperature;
                locationTimezone.textContent =  data.timezone; 
                setIcons(icon, document.querySelector(".icon"))

                let cel = (temperature - 32)* (5 / 9);
                cel = Math.round(cel*100)/100;;

                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === '°C'){
                        temperatureSpan.textContent = '°F'
                        temperatureDegree.textContent = temperature;
                    }
                    else{
                        temperatureSpan.textContent = '°C'
                        temperatureDegree.textContent = cel;
                    }
                })
            })

        })


        function setIcons(icon, iconID) {
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play()
            return skycons.set(iconID, Skycons[currentIcon]);
        }
    }
})