// HTML ELEMENTS
const searchInput=document.querySelector('#searchInput');
let searchBtn=document.querySelector('#searchBtn');
const apiKey='a17c2c5621a2403eb68155234241801';
const baseUrl='http://api.weatherapi.com/v1/forecast.json';
var loc=document.querySelector('.location');
var num=document.querySelector('.num');
var todayweatherImg=document.querySelector('#todayweatherImg');
var custom=document.querySelector('.custom');
var todayImg=document.querySelector('#todayImg');
var humdity=document.querySelector('#humdity');
var speed=document.querySelector('#speed');
var wind=document.querySelector('#wind');
var temp=document.querySelectorAll('.temp');
var temp2=document.querySelectorAll('.temp2');
var today=document.querySelector('#today');
var day=document.querySelector('.day');
var day1=document.querySelectorAll('.day1');
var date=document.querySelector('.date');
var month=document.querySelector('.month');
var nextday=document.querySelector('#day');
var text=document.querySelectorAll('.text');
var nextdayImg=document.querySelectorAll('.nextdayImg');
 
console.log(nextdayImg);
console.log(day1);
// APP VARIABLES
// FUNCTIONS
async function getWeather(location){
    let x=await fetch(`${baseUrl}?key=${apiKey}&days=3&q=${location}`);
    let data=await x.json();
    console.log(data);
    return data;
     
}
 
navigator.geolocation.getCurrentPosition(sucess);
function displaytodayData(data){
    var todayDate=new Date();
    day.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"});
    date.innerHTML=todayDate.getDate();
    month.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"});

    loc.innerHTML=data.location.name; 
     num.innerHTML=data.current.temp_c+' '+`<sup>o</sup>C`;
   
   custom.innerHTML=data.current.condition.text;
   todayweatherImg.setAttribute("src",data.current.condition.icon);
   humdity.innerHTML=data.current.humidity;
   speed.innerHTML=data.current.wind_kph+' '+"km/h";
   wind.innerHTML=data.current.wind_dir;
 
}
function getnextDay(data){
    for(let i=0;i<2;i++){
        var nextDay=new Date(data.forecast.forecastday[i+1].date);
        console.log(nextDay);
        day1[i].innerHTML=nextDay.toLocaleDateString("en-US",{weekday:"long"});
      temp[i].innerHTML= data.forecast
      .forecastday[i+1].day.maxtemp_c+`<sup>o</sup>c`;
     temp2[i].innerHTML= data.forecast.forecastday[i+1].day.mintemp_c+`<sup>o</sup>c`;
      text[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text;
      nextdayImg[i].setAttribute("src",data.forecast.forecastday[i+1].day.condition.icon);
      console.log(nextdayImg[1]);
    }
}
 
async function sucess(position="cairo"){
    var y=await getWeather(position);
    if(!y.error){
      displaytodayData(y);
    getnextDay(y);
    }
 
}
sucess();
// EVENTS
searchInput.addEventListener('keyup',function(){
    sucess(searchInput.value)
})
