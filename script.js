$(document).ready(function () {
  $(document).keypress(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    }
);


const m = moment ();
    console.log(moment());
    console.log(m.format('1'));

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




    var APIKey = "afc613c957af286a003a7cca52bdf014";
    var city = $("#search").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    
    
    // Create an AJAX call to retrieve data, log to console
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // Log to HTML
        $("#todaysDate").html(moment().format("1"));

        var iconID = response.weather[0].icon;
        $('#icon').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
        // search button  removes the img tag from the html when clicked ...
        $("#cityName").text(response.name);
        var tempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
        $("#temp").text("Temperature: " + tempF + "°F");
        var wind = ((response.wind.speed * 2.236936).toFixed(1));
        $("#windSpeed").text("Wind Speed: " + wind + "mph");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $('#uvDiv').css("display", "flex");
            $('#uvIndex').text(response.value);
            if (response.value <= 2) {
              $('#uvDiv').css("background-color", "#00ff40");
              $('#uvIndex').css("color", "black");
          } else if (response.value > 2 && response.value <= 5) {
            $('#uvDiv').css("background-color", "#fffb00");
            $('#uvIndex').css("color", "black");
          } else if (response.value > 5 && response.value <= 7) {
            $('#uvDiv').css("background-color", "#ff9100");
            $('#uvIndex').css("color", "black");
          } else if (response.value > 7 && response.value <= 10) {
            $('#uvDiv').css("background-color", "#ff0000");
            $('#uvIndex').css("color", "#ffffff");
          } else {
            $('#uvDiv').css("background-color", "#ee00ff");
            $('#uvIndex').css("color", "#ffffff");
          }
        });

        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "&appid=" + APIKey;
        $.ajax({
          url: forecastURL,
          method: "GET"
        }).then(function(response){
          console.log(response);
          console.log(response.list);

          $("#d1d").html(moment().add(1, 'days').format("1"));
          $("#d2d").html(moment().add(2, 'days').format("1"));
          $("#d3d").html(moment().add(3, 'days').format("1"));
          $("#d4d").html(moment().add(4, 'days').format("1"));
          $("#d5d").html(moment().add(5, 'days').format("1"));

          var iconID0 = response.list[0].weather[0].icon;
          $('#d1i').attr("src", "http://openweathermap.org/img/wn/" + iconID0 + "@2x.png");
          var tempF0 = ((response.list[0].main.temp - 273.15) * 1.80 + "%");
          $("#d1t").text("Temp: " + tempF0 + "°F");
          $("#d1h").text("Humidity: " + response.list[0].main.humidity + "%");


          var iconID1 = response.list[1].weather[0].icon;
          $('#d2i').attr("src", "http://openweathermap.org/img/wn/" + iconID1 + "@2x.png");
          var tempF1 = ((response.list[1].main.temp - 273.15) * 1.80 + "%");
          $("#d2t").text("Temp: " + tempF1 + "°F");
          $("#d2h").text("Humidity: " + response.list[1].main.humidity + "%");


          var iconID2 = response.list[2].weather[0].icon;
          $('#d3i').attr("src", "http://openweathermap.org/img/wn/" + iconID2 + "@2x.png");
          var tempF2 = ((response.list[2].main.temp - 273.15) * 1.80 + "%");
          $("#d3t").text("Temp: " + tempF2 + "°F");
          $("#d3h").text("Humidity: " + response.list[2].main.humidity + "%");


          var iconID3 = response.list[3].weather[0].icon;
          $('#d4i').attr("src", "http://openweathermap.org/img/wn/" + iconID3 + "@2x.png");
          var tempF3 = ((response.list[3].main.temp - 273.15) * 1.80 + "%");
          $("#d4t").text("Temp: " + tempF3 + "°F");
          $("#d4h").text("Humidity: " + response.list[3].main.humidity + "%");


          var iconID4 = response.list[4].weather[0].icon;
          $('#d5i').attr("src", "http://openweathermap.org/img/wn/" + iconID4 + "@2x.png");
          var tempF4 = ((response.list[4].main.temp - 273.15) * 1.80 + "%");
          $("#d5t").text("Temp: " + tempF4 + "°F");
          $("#d5h").text("Humidity: " + response.list[4].main.humidity + "%");

        });     
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



