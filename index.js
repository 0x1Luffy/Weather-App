// console.log('Testing');

 const userTab = document.querySelector("[data-userweather]");
 const searchTab = document.querySelector("[data-searchWeather]");
 const userContainer =  document.querySelector('.weather-container');

 const grantAccessContainer = document.querySelector('.grant-location-container');
 const searchForm = document.querySelector('[data-searchForm]');
 const loadingScreen = document.querySelector('.loading-container');
 const userInfoContainer = document.querySelector('.user-info-container');

 let currentTab = userTab;
 const API_KEY = "4bba4c580690dc77e8ff3999726d6dac";
 currentTab.classList.add('current-tab');

function switchTab(clickedTab) {
     if(clickedTab != currentTab)
     {
        currentTab.classList.remove('current-tab');
        currentTab = clickedTab;
        currentTab.classList.add('current-tab');

        if(!searchForm.classList.contains('active'))
        {
            userInfoContainer.classList.remove('active');
            grantAccessContainer.classList.remove('active');
            searchForm.classList.add('active');
        }
        else{
         searchForm.classList.remove("active");
         userInfoContainer.classList.remove("active");
         getfromSessionStorage();
        }
     }
}
 userTab.addEventListener('click', () =>{
    switchTab(userTab);
 });

 searchTab.addEventListener('click', () => {
    switchTab(searchTab);
 });

function getfromSessionStorage(){
   const localCoordinates = sessionStorage.getItem("user-coordinates");
   if(!localCoordinates) {
      grantAccessContainer.classList.add("active");
   }
   else {
      const coordinates = JSON.parse(localCoordinates);
      fetchUserWeatherInfo(coordinates);
   }
}

  async function fetchUserWeatherInfo(coordinates) {
 const {lat, lon} = coordinates;
 grantAccessContainer.classList.remove("active");
 loadingScreen.classList.add("active");
 try{
     const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
     );
     const data = await response.json();
     loadingScreen.classList.remove("active");
     userInfoContainer.classList.add("active");
     renderWeatherInfo(data);
 }
 catch(err){
  loadingScreen.classList.remove("active");
 }
}
function renderWeatherInfo(weatherInfo) {
   const cityName =  document.querySelector("[data-cityName]");
   const countryIcon = document.querySelector("[data-countryIcon]");
   const desc = document.querySelector("[data-weatherDesc]");
   const weatherIcon = document.querySelector("[dta-weatherIcon]");
   const temp = document.querySelector("[data-temp]");
   const windspeed = document.querySelector("[data-windspeed]");
   const humidity = document.querySelector("[data-humidity]");
   const cloudineed =  document.querySelector("[data-cloudiness]");


   cityName.innerText = weatherInfo?.name;
   countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

desc.innerText = weatherInfo?.weather?.[0]?.description;
weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
}