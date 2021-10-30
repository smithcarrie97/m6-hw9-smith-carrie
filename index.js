var formEl = document.querySelector('form')
var inputEl = document.querySelector('input')
var weatherEl = document.getElementById('weather')
console.log (formEl, inputEl, weatherEl)

// attach submit to form event
// fetch weather data if there is a query
// call render weather function
formEl.onsubmit = function(e) {
    e.preventDefault()
    var weatherQuery = inputEl.value.trim()
    if (!weatherQuery) return
    fetch('https://api.openweathermap.org/data/2.5/weather?appid=9e38de1e0875f34d69ce021be2375874&q=' + weatherQuery)
    .then(function(response) {
      return response.json()
    })
    .then(function(result) {
      console.log(result)
      renderWeather(res)
      inputEl.value = ""
    })
    .catch(function(err) {
      console.log(err)
    })
  }

function renderWeather(weatherObj) {
  // clear previous weather
  weatherEl.innerHTML = ""
  // handle weaather not found
  if (weatherObj.Response === 'False') {
    weatherEl.textContent = 'Movie not found'
    return
  }

 // render current weather
 var currentweatherEl = document.createElement('h2')
 currentweatherEl.textContent = weatherObj.weather
 weatherEl.appendChild(currenweatherEl)

 // render weather icon
 var weathericon = document.createElement('img')
 weathericon.src = weatherObj.icon
 weathericon.alt = weatherObj.description
 weatherEl.appendChild(weathericon)


 // render current temperature
 var temperature = document.createElement('p')
 temperature.textContent = weatherObj.temp
 weatherEl.appendChild(temperature)

 // render feels like temperature
 var feels = document.createElement('p')
 feels.style.fontStyle = 'italic'
 feels.textContent = weatherObj.feels_like
 weatherEl.appendChild(feels)

