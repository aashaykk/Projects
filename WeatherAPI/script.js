// 1be89238b91a54cda6f4dfccf6ec4edc API KEY

const date = document.getElementById('date')
const city = document.getElementById('city')
const temp = document.getElementById('temp')
const tenpImg = document.getElementById('tempImg')
const desc = document.getElementById('description')
const tempMax = document.getElementById('tempMax')
const tempMin = document.getElementById('tempMin')


const months = ["January", "Februray","March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

let dateObj = new Date()
let month = months[dateObj.getUTCMonth()]
let day = dateObj.getUTCDate()
let year = dateObj.getUTCFullYear()

date.innerHTML = `${month} ${day} ${year}`

const app = document.getElementById('app')

const getWeather = async () => {
    try {
        const cityName = document.getElementById('searchBarInput').value
        const weatherDataFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1be89238b91a54cda6f4dfccf6ec4edc&units=metric`,{
            headers: {
                Accept: "application/json"
            }
        })

        const weatherData = await weatherDataFetch.json()
        console.log(weatherData);
        city.innerHTML = `${weatherData.name}`
        desc.innerHTML = `${weatherData.weather[0].main}`
        tenpImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" />`
        temp.innerHTML = `<h2>${Math.round(weatherData.main.temp)}&deg;C</h2>`
        tempMax.innerHTML = `${weatherData.main.temp_max}`
        tempMin.innerHTML = `${weatherData.main.temp_min}`
        

    } catch(error) {
        console.log(error);
        

    }
}

