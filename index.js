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
     }
}
 userTab.addEventListener('click', () =>{
    switchTab(userTab);
 });

 searchTab.addEventListener('click', () => {
    switchTab(searchTab);
 });