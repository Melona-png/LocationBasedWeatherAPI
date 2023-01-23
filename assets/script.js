let city = {
  apiKey: "07fa7f1f73fff1e778fbccd18241a41d",
  fetchCity: function () {
    fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&appid=" +
        appKey
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  },
};

let weather = {
  apiKey: "",
};

var searchFormEl = document.querySelector("#search-form");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;

  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }

  var queryString = "./search-results.html?q=" + searchInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
