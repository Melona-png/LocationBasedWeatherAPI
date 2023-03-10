// api key from openweather map
let weather = {
  apiKey: "07fa7f1f73fff1e778fbccd18241a41d",
  fetchWeather: function (city) {
    return fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.displayWeather(data);
        let lon = data.coord.lon;
        let lat = data.coord.lat;
        this.fiveDayFetch(lat, lon);

        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${month}-${day}-${year}`;
        document.getElementById("date").innerHTML = currentDate;
      });
  },
  fiveDayFetch: function (lat, lon) {
    return fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        this.fiveDayRender(data);
      });
  },

  fiveDayRender: function (data) {
    //how to list the five day forecast- pick a time of the day and stick with it
    console.log(data);
    const forecastEl = document.querySelector(".forecast");
    //clear the card before rendering more
    forecastEl.innerHTML = '';
    for (let i = 0; i < data.list.length; i++) {
      let dayData = data.list[i].dt_txt.split(" ")[1];

      if (dayData === "12:00:00") {
        let temp = data.list[i].main.temp;
        let humidity = data.list[i].main.humidity;
        let description = data.list[i].weather[0].description;
        let wind = data.list[i].wind.speed;
        // weather icon
        const icon = data.list[i].weather[0].icon;
        let iconURL =
          "http://openweathermap.org/img/wn/" + `${icon}` + "@2x.png";
        //displaying data weather
        const iconData = document.createElement("p");
        let cardDiv = document.createElement("div");
        const tempEl = document.createElement("p");
        const humiEl = document.createElement("p");
        const descEl = document.createElement("p");
        const windyEl = document.createElement("p");
        cardDiv.classList.add("yeehaw");
        tempEl.textContent = temp + " F";
        humiEl.textContent = humidity + "%";
        windyEl.textContent = wind + " MPH";
        descEl.textContent = description;
        iconData.innerHTML = `<img src = "${iconURL}">`;
        //appending data
        cardDiv.appendChild(iconData);
        cardDiv.appendChild(tempEl);
        cardDiv.appendChild(humiEl);
        cardDiv.appendChild(windyEl);
        cardDiv.appendChild(descEl);
        forecastEl.append(cardDiv);
      }
    }
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Today's Weather: " + name;
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp;
    document.querySelector(".humidity").innerText =
      "Humidty: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " MP/H";
  },
  search: function () {
    let form_input = document.querySelector(".form-input");
    this.fetchWeather(form_input.value);
    //check if the value already exists
    if(!Object.keys(localStorage).includes(form_input.value)){
      //SET LOCALSTORAGE
      localStorage.setItem(form_input.value, null);
      //create buttons after search
      let citybtn = document.createElement("button");
      citybtn.textContent = form_input.value;
      citybtn.addEventListener("click", function (e) {
        e.preventDefault();
        weather.btnsearch(form_input.value);
      });
      document.querySelector("form").append(citybtn);
    }
  },
  btnsearch: function (value) {
    this.fetchWeather(value);
  },
};

document.querySelector(".btn").addEventListener("click", function (e) {
  e.preventDefault();
  weather.search();
});

// initialize existing cities already in localstorage
let cities = [];
Object.keys(localStorage).map((key) => {
  cities.push(key);
});
for (let city of cities) {
  let citybtn = document.createElement("button");
  citybtn.textContent = city;
  citybtn.addEventListener("click", function (e) {
    e.preventDefault();
    weather.btnsearch(city);
  });
  document.querySelector('form').append(citybtn);
}