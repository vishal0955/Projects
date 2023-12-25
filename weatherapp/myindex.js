//query selector to your weather tab
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

//initially variables needed
let oldTab = userTab;
const API_KEY = "33a7cb4865e06a6a99606211beecc72b";
oldTab.classList.add("current-tab");
getfromSessionStorage();


function switchTab(newTab) {
 if(newTab != oldTab)
 {
     oldTab.classList.remove("current-tab");
     oldTab = newTab;
    oldTab.classList.add("current-tab");

    if(!searchForm.classList.contains("active")) {
        //kya searchfrom wala container invisible h , if yes then make it visible
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");

    }
    else {
        //main pehle searchTab per tha , ab your weather visible krna h
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        //ab your weather tab me aagye h to weather bhi display krna padega, so lets check localStorage for 
        //coordinates , if we have save them there
        getfromSessionStorage();
    }
 }
 
}




userTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    console.log("check kr rha hu ");
    switchTab(userTab);
}
);

searchTab.addEventListener("click", () => {
    //pass clicked tab as  input parameter
    console.log("searchTab search kr hu "); 
    switchTab(searchTab);
});

//check if localStorage has coordinates stored
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //if local coordinates are not stored
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates =JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {

    const {lat, lon} = coordinates;
    //make grant access invisible
    grantAccessContainer.classList.remove("active");
    
    //loaderscreen visible
    loadingScreen.classList.add("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
        const data = await response.json();
    
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");

    }
}

function renderWeatherInfo(weatherInfo) {
    //we have to fetch data items
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch info from weatherInfo and put in values
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;

}

function getLocation() {
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        //hw show an alert
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat : position.coords.latitude,
        lon : position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[btn-grantaccess]");
 
// adding eventListener that on clicking the  button geolocation API will call and latitude and longitude will be called

grantAccessButton.addEventListener("click", getLocation);

//search weather is clicked
const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName === "")
     return;
    else {
        fetchSearchWeatherInfo(cityName);

    }
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {

    }
}