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
  fetch('https://api.openweathermap.org/data/2.5/weather?appid=9e38de1e0875f34d69ce021be2375874&units=imperial&q=' + weatherQuery)
  .then(function(res) {
    return res.json()
  })
  .then(function(res) {
    console.log(res)
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
    weatherEl.textContent = 'Weather not found'
    return
  }

  // render current weather
  var currentweatherEl = document.createElement('h2')
  currentweatherEl.textContent = weatherObj.weather
  weatherEl.appendChild(currentweatherEl)

  // render weather icon
  var weathericon = document.createElement('img')
  weathericon.src = weatherObj.weather.icon
  weathericon.alt = weatherObj.weather.description
  weatherEl.appendChild(weathericon)


  // render current temperature
  var temperature = document.createElement('p')
  temperature.textContent = 'Current ' + weatherObj.main.temp
  weatherEl.appendChild(temperature)

  // render feels like temperature
  var feels = document.createElement('p')
  feels.style.fontStyle = 'italic'
  feels.textContent = 'Feels like ' + weatherObj.main.feels_like
  weatherEl.appendChild(feels)
}
