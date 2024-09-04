// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const apiKey = 'xxxxxxxxxx';
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-btn');
    searchButton.addEventListener('click', function() {
        const city = document.getElementById('city-input').value;
        if (city) {
            getWeatherByCity(city);
        } else {
            alert('Please enter a city name.');
        }
    });
});

function getWeatherByCity(city) {
    const currentWeatherUrl = `${apiUrl}weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `${apiUrl}forecast?q=${city}&units=metric&appid=${apiKey}`;

   
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => displayCurrentWeather(data))
        .catch(err => console.error(err));

    
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(err => console.error(err));
}

function displayCurrentWeather(data) {
    if (data.cod !== 200) {
        alert(data.message);
        return;
    }

    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    location.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
}

function displayForecast(data) {
    if (data.cod !== "200") {
        alert(data.message);
        return;
    }

    const forecastData = document.getElementById('forecast-data');
    forecastData.innerHTML = '';

    data.list.forEach((forecast, index) => {
        if (index % 8 === 0) { 
            const forecastElement = document.createElement('div');
            forecastElement.innerHTML = `
                <p><strong>${new Date(forecast.dt_txt).toLocaleDateString()}</strong></p>
                <p>Temp: ${forecast.main.temp}°C</p>
                <p>Weather: ${forecast.weather[0].description}</p>
            `;
            forecastData.appendChild(forecastElement);
        }
    });
}
