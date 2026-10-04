javascript
// ======================================
// WEATHER API
// ======================================

const API_KEY = "c0cf290b56284be5917143213261108";

const API_URL =
    "https://api.weatherapi.com/v1/current.json";


// ======================================
// GET HTML ELEMENTS
// ======================================

const input =
    document.getElementById("locationInput");

const button =
    document.getElementById("searchBtn");

const city =
    document.getElementById("city");

const temperature =
    document.getElementById("temperature");

const condition =
    document.getElementById("condition");

const feelsLike =
    document.getElementById("feelsLike");

const humidity =
    document.getElementById("humidity");

const wind =
    document.getElementById("wind");

const weatherIcon =
    document.getElementById("weatherIcon");

const error =
    document.getElementById("error");


// ======================================
// SEARCH WEATHER
// ======================================

async function getWeather() {

    // Get the location typed by the user
    const location = input.value.trim();

    // Check if input is empty
    if (location === "") {

        error.textContent =
            "Please enter a location.";

        return;
    }

    error.textContent = "";


    try {

        // ======================================
        // CREATE API URL
        // ======================================

        const url =
            `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`;


        console.log("Fetching:", url);


        // ======================================
        // FETCH DATA
        // ======================================

        const response =
            await fetch('http://api.weatherapi.com/v1/current.json?key=c0cf290b56284be5917143213261108&q=London&aqi=yes');


        const data =
            await response.json();


        console.log(data);


        // ======================================
        // CHECK ERROR
        // ======================================

        if (data.error) {

            error.textContent =
                "Location not found. Try another location.";

            return;
        }


        // ======================================
        // DISPLAY DATA
        // ======================================

        city.textContent =
            `${data.location.name}, ${data.location.country}`;


        temperature.textContent =
            Math.round(data.current.temp_c);


        condition.textContent =
            data.current.condition.text;


        feelsLike.textContent =
            Math.round(data.current.feelslike_c);


        humidity.textContent =
            data.current.humidity;


        wind.textContent =
            data.current.wind_kph;


        // Weather icon
        let icon =
            data.current.condition.icon;


        if (icon.startsWith("//")) {

            icon = "https:" + icon;
        }


        weatherIcon.src = icon;

    }

    catch (err) {

        console.error(err);

        error.textContent =
            "Something went wrong. Please try again.";
    }
}


// ======================================
// SEARCH BUTTON
// ======================================

button.addEventListener(
    "click",
    getWeather
);


// ======================================
// ENTER KEY
// ======================================

input.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            getWeather();

        }

    }
);
