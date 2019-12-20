$(document).ready(function () {
  $(document).keypress(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    }
);

// var searchInput = $("#search").val();
// var cityBtns = $("#cityBtns");

// give search button a click function to:
$("#searchBtn").on("click", function () {
    //     // create button for city when it has been searched
    //     // this doesn't work? idk
    //     var newBtn = $("<button></button>")
    //     .addType("button")
    //     .addClass("btn btn-light")
    //     .attr('id', searchInput);
    //     newBtn.html(searchInput);
    //     newBtn.appendTo(cityBtns);

    //     // it doesn't work either?
    //     // $('#cityBtns').append(`<button type='button' class='btn btn-light>${$("#search").val()}</button>`);

    //     // this works but i want it to be a button not just text
    //     // $('#cityBtns').append($("#search").val());

    //     // store in localStorage




    var APIKey = "e274f1ff5c5e6a9cb9a6316b664000e4";
    var city = $("#search").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    // https://api.openweathermap.org/data/2.5/weather?q=denver&appid=0abab7784e1c82cec0681f8c35a2f302
    // Create an AJAX call to retrieve data, log to console
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // Log to HTML
        var iconID = response.weather[0].icon;
        $('#icon').attr("src", "http://openweathermap.org/img/wn/"+iconID+"@2x.png");
        // search button  removes the img tag from the html when clicked ...
        $("#cityName").text(response.name);
        var tempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
        $("#temp").text("Temperature: " + tempF + "°F");
        var wind = ((response.wind.speed * 2.236936).toFixed(1));
        $("#windSpeed").text("Wind Speed: " + wind + "mph");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");

        var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#uvIndex").text("UV Index: " + response.value);
        });
    });


// https://api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37&appid=0abab7784e1c82cec0681f8c35a2f302
// get weather query url
// add input from search box to url
// create a call to get that city's info (Name/date/icon, temp, humidity, wind speed in mph, UV index)
// append that info to the #cityInfo container

// create another call for the forecast info
// takes average of three of the times of day included in the forecast
// needs date, icon of forecasted type of weather, high temp, and high humidity
// appends to cards on the page

});


}); 
