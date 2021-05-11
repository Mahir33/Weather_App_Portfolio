const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=d6701d20422db64e3b53b3bd24d0936d';
const units = '&units=metric';

let $city;
let $url;


const celcius = '°C'
const procent = '%'

photo.setAttribute('src', "./src/img/unknown.png")

const getWeather = () => {
    $city = (!input.value) ? 'Berlin' : input.value;
    $url = apiLink + $city + apiKey + units

    axios.get($url)
    .then(res => {
        const temp = res.data.main.temp;
        const humid = res.data.main.humidity;
        const status = Object.assign({}, ...res.data.weather);

        cityName.textContent = res.data.name;
        weather.textContent = status.main;
        temperature.textContent = Math.floor(temp) + celcius;
        humidity.textContent = humid + procent;
        
        // console.log(status)
        warning.textContent = '';
        input.value = '';

        if(status.id >= 200 && status.id < 300) {
            photo.setAttribute('src', "./src/img/thunderstorm.png")
        } else if (status.id >= 300 && status.id < 400) {
            photo.setAttribute('src', "./src/img/drizzle.png")
        } else if (status.id >= 500 && status.id < 600) {
            photo.setAttribute('src', "./src/img/rain.png")
        } else if (status.id >= 600 && status.id < 700) {
            photo.setAttribute('src', "./src/img/ice.png")
        } else if (status.id === 741) {
            photo.setAttribute('src', "./src/img/fog.png")
        } else if (status.id === 800) {
            photo.setAttribute('src', "./src/img/sun.png")
        } else if (status.id >= 801 && status.id < 804) {
            photo.setAttribute('src', "./src/img/cloud.png")
        } else {
            photo.setAttribute('src', "./src/img/unknown.png")
        }
    })
    .catch(() => warning.textContent = 'Chec if the name of the city is correct!')
};

const enterCheck = () => {
    if(event.keyCode === 13) {
        getWeather()
    } 
} 

getWeather()
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck)
