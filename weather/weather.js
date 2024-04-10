onload=()=>{
    let weather = {
        Clear: "https://cdn4.iconfinder.com/data/icons/thanksgiving-2020-flat-2/64/thanksgiving-76-64.png",
        Rain: "https://cd,n0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-07-64.png",
        Snow: "https://cdn4.iconfinder.com/data/icons/weather-29/256/snowflake-64.png",
        Cloud: "https://cdn1.iconfinder.com/data/icons/professional-toolbar-icons-2/64/Clouds_weather_cloudy_rain.png",
        Mist: "https://cdn3.iconfinder.com/data/icons/weather-free-1/32/Weather_Free_Filled_Outline_mist-weather-foggy-cloud-64.png",
        Haze: "https://cdn0.iconfinder.com/data/icons/weather-gradient/64/HAZE-mist-fog-foggy-weather-64.png",
        Thunderstorm: "https://cdn2.iconfinder.com/data/icons/weather-collection-1/512/thunderstorm-01-64.png"
    }
    let searchInputEl = document.getElementById("searchInput");
    let imageEl = document.getElementById("image");
    let temp = document.getElementById("temp");
    let descriptionEl = document.getElementById("description");
    let humidityEl = document.getElementById("humidity");
    let wind = document.getElementById("wind");
    let container = document.getElementById("container");
    let errorMsgEl = document.getElementById("errorMsg");
    let spinnerEl = document.getElementById("spinner");
    
    function convertTemp(temp) {
        let tempcel = temp - 273;
        return tempcel;
    }
    
    
    searchInputEl.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            spinnerEl.classList.remove("d-none");
            container.classList.add("d-none");
            errorMsgEl.classList.add("d-none")
            console.log(searchInputEl.value);
            let url = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=20666a5b7a3b46c294b713f4ac5b9896";
    
            let options = {
                method: "GET"
            };
    
            fetch(url, options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonData) {
                    console.log(jsonData);
                    spinnerEl.classList.add("d-none");
                    if (jsonData.cod !== "404") {
                        console.log("exec");
                        container.classList.remove("d-none");
                        errorMsgEl.classList.add("d-none");
                        switch (jsonData.weather[0].main) {
                            case "Clear":
                                imageEl.src = weather.Clear;
                                break;
    
                            case "Rain":
                                imageEl.src = weather.Rain;
                                break;
    
                            case "Snow":
                                imageEl.src = weather.Snow;
                                break;
                            case "Clouds":
                                imageEl.src = weather.Cloud;
                                break;
                            case "Mist":
                                imageEl.src = weather.Mist;
                                break;
                            case "Haze":
                                imageEl.src = weather.Haze;
                                break;
                            case "Thunderstorm":
                                imageEl.src = weather.Thunderstorm;
                                break;
                            default:
                                imageEl.src = weather.Clear;
                        }
                        temp.textContent = convertTemp(parseInt(jsonData.main.temp)) + "°C";
                        descriptionEl.textContent = jsonData.weather[0].description;
                        humidityEl.textContent = jsonData.main.humidity + "%";
                        wind.textContent = jsonData.wind.speed + " KMPH";
                    } else {
                        container.classList.add("d-none");
                        errorMsgEl.classList.remove("d-none");
                    }
                })
    
        }
    
    })
}