
const fetchDataBtn = document.getElementById('fetch-data-btn');
const mapContainer = document.getElementById('map-container');
const weatherDataContainer = document.getElementById('weather-data-container');


const googleMapsApiKey = '3bf66a95324e8ac5506d79b119995486';
const googleMapsUrl = `https://maps.app.goo.gl/h71iiX1ubmQddcsN7`;


const openWeatherMapApiKey = '3bf66a95324e8ac5506d79b119995486';
const openWeatherMapUrl = `https://home.openweathermap.org/`;

function getGeolocation() {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        
        displayMap(latitude, longitude);

        
        fetchWeatherData(latitude, longitude);
    }, error => {
        console.error('Error getting geolocation:', error);
    });
}


function displayMap(latitude, longitude) {
    const mapUrl = `https://www.google.co.in/maps/place/Ganesh+Nagar/@19.0211554,72.8814124,14.33z/data=!4m6!3m5!1s0x3be7cf3dd38091c1:0xaf7a6d21fb42bf98!8m2!3d19.01797!4d72.869079!16s%2Fg%2F11b7p_95mh?entry=ttu`;
    const mapIframe = document.createElement('iframe');
    mapIframe.src = mapUrl;
    mapIframe.width = '100%';
    mapIframe.height = '400';
    mapContainer.appendChild(mapIframe);
}


function fetchWeatherData(latitude, longitude) {
    const url = `${openWeatherMapUrl}&lat=${latitude}&lon=${longitude}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherDataHtml = `
                <h2>Weather Data</h2>
                <ul>
                    <li><strong>Temperature:</strong> ${data.current.temp}°C</li>
                    <li><strong>Humidity:</strong> ${data.current.humidity}%</li>
                    <li><strong>Wind Speed:</strong> ${data.current.wind_speed} m/s</li>
                </ul>
            `;
            weatherDataContainer.innerHTML = weatherDataHtml;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}


fetchDataBtn.addEventListener('click', getGeolocation);