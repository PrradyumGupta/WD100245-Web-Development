const apiKey = '2b13a190913c4e3cf587f5d34fb6b59a'; // Your OpenWeather API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const background = document.querySelector('.background');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
            updateBackground(data.weather[0].main);
        } else {
            weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <img class="weather-icon" src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
        <p>${weather[0].description}</p>
        <div class="weather-details">
            <p>Temperature: ${main.temp}°C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
        </div>
    `;
}

function updateBackground(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            background.style.background = 'linear-gradient(135deg, #87CEEB, #1E90FF)';
            break;
        case 'clouds':
            background.style.background = 'linear-gradient(135deg, #B0C4DE, #778899)';
            break;
        case 'rain':
            background.style.background = 'linear-gradient(135deg, #4682B4, #6A5ACD)';
            break;
        case 'snow':
            background.style.background = 'linear-gradient(135deg, #E0FFFF, #F0F8FF)';
            break;
        default:
            background.style.background = 'linear-gradient(135deg, #87CEEB, #1E90FF)';
    }
}
