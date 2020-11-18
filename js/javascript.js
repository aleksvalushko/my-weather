window.addEventListener('load', () => {
    let long,
        lat,
        timezone = document.querySelector('.location-timezone'),
        temperatureSection = document.querySelector('.temperature'),
        temperatureDegree = document.querySelector('.temperature h1'),
        temperatureSpan = document.querySelector('.temperature span'),
        icon = document.querySelector('.icon img'),
        description = document.querySelector('.description');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f4cac63c1c37398ab9151f7d93014510`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const timezoneName = data.name,
                    temperatureValue = Math.round(data.main.temp - 273.15),
                    descriptionValue = data.weather[0].description,
                    iconPath = data.weather[0].icon;
                    timezone.textContent = timezoneName;
                    temperatureDegree.textContent = temperatureValue;
                    description.textContent = descriptionValue;
                    icon.src = `http://openweathermap.org/img/w/${iconPath}.png`;

                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === 'C') {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = (temperatureValue * 9 /5) + 32;
                        } else {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = temperatureValue;
                        }
                    })
                })
        });
    }
});