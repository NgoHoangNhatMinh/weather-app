const API_KEY = "C5YZ53NHBC6CU7VK5DA88DER7";
const form = document.querySelector("form");
const weather = document.querySelector(".weather");

async function getWeatherData(location) {
    const API_URL =  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=" + API_KEY;
    const response = await fetch(API_URL, {mode: 'cors'});
    const weatherData = await response.json(); 
    const displayedData = processData(weatherData);

    return displayedData;
}

function processData(data) {
    return {
        address: data.resolvedAddress,
        timezone: data.timezone,
        description: data.description,
        time: data.currentConditions.datetime,
        temp: data.currentConditions.temp,
        feelslike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        precip: data.currentConditions.precip,
        precipprob: data.currentConditions.precipprob,
        windspeed: data.currentConditions.windspeed,
        visibility: data.currentConditions.visibility,
        cloudcover: data.currentConditions.cloudcover,
        icon: data.currentConditions.icon
    }
}

async function displayWeather(data) {
    const displayedData = await data;

    weather.textContent = "";

    const address = document.createElement("p");
    address.textContent = "Address: " + displayedData.address;

    const time = document.createElement("p");
    time.textContent = "Time: " + displayedData.time;

    const temp = document.createElement("p");
    temp.textContent = "Temperature: " + displayedData.temp;

    const humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + displayedData.humidity;

    weather.appendChild(address);
    weather.appendChild(time);
    weather.appendChild(temp);
    weather.appendChild(humidity);

    console.log(displayedData);
}

// getWeatherData("United States");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = document.querySelector("#location").value;

    // This is a promise;
    const data = getWeatherData(location);
    displayWeather(data);
})