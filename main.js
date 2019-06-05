window.addEventListener("load", (result) => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    
    let locationTimezone = document.querySelector('.location-timezone');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {
            long = pos.coords.longitude;
            lat = pos.coords.latitude;
            
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            // Solution from stack overflow
            
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