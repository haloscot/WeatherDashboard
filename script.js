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






// var cities = [];
if (localStorage.getItem("Cities") === null) {
  var cities = [];
  var oldCities = [];
  localStorage.setItem("Cities", JSON.stringify(cities, oldCities));

} else {
  var oldCities = JSON.parse(localStorage.getItem("Cities"));
  oldCities.forEach(city => {
    var newBtn = $(`<button type="button" class="btn btn-primary cityButtons" id=${city}></button>`);
    
    newBtn.text(city);
    newBtn.appendTo(cityBtns);
  })

}


// give search button a click function to:
$("#searchBtn").on("click", function () {
   
    var searchInput = $("#search").val();
    var newBtn = $(`<button type="button" class="btn btn-primary cityButtons" id=${city}></button>`);

    newBtn.text(searchInput);
    newBtn.appendTo(cityBtns);

    console.log(searchInput);

    var cities = [];
    var oldCities = JSON.parse(localStorage.getItem("Cities"));

    console.log(cities);

    cities.push(searchInput);
    localStorage.setItem("Cities", JSON.stringify([...cities, ...oldCities]));
  
    generateInfo();

  });

  $(".cityButtons").on("click", function (){
    var APIKey = "afc613c957af286a003a7cca52bdf014";
    var city = $(this).text();
    console.log($(this).text());
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    
    


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // Log to HTML
        $("#todaysDate").html(moment().format("1"));

        var iconID = response.weather[0].icon;
        $('#icon').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
        $("#cityName").text(response.name);
        var tempF = (((response.main.temp - 273.15) * 1.80 + 32).toFixed(2));
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

    function generateInfo () {
      var APIKey = "afc613c957af286a003a7cca52bdf014";
      var city = $("#search").val();
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;



      $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // Log the data in HTML
        $("#todaysDate").html(moment().format("l"));

        var iconID = response.weather[0].icon;
        $('#icon').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
        $('#cityName').text(response.name);
        var tempF = (((response.main.temp - 273.15) * 1.80 + 32).toFixed(2));
        $('#temp').text("Temperature: " + tempF + "°F");
        var wind = ((response.wind.speed * 2.236936).toFixed(1));
        $('#windSpeed').text("Wind Speed: " + wind + "mph");
        $('#humidity').text("Humidity: " + response.main.humidity + "%");

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;
        $.ajax({
          url: uvURL,
          method: "GET"
        }).then(function (response) {console.log(response);
          $('#uvDiv').css("display", "flex");
          $("#uvIndex").text(response.value);
          if (response.value <= 2) {
              $('#uvIndex').css("background-color", "#00ff40");
              $('#uvIndex').css("color", "black");
          } else if (response.value > 2 && response.value <= 5) {
              $('#uvIndex').css("background-color", "#fffb00");
              $('#uvIndex').css("color", "black");
          } else if (response.value > 5 && response.value <= 7) {
              $('#uvIndex').css("background-color", "#ff9100");
              $('#uvIndex').css("color", "black");
          } else if (response.value > 7 && response.value <= 10) {
              $('#uvIndex').css("background-color", "#ff0000");
              $('#uvIndex').css("color", "#ffffff");
          } else {
              $('#uvIndex').css("background-color", "#ee00ff");
              $('#uvIndex').css("color", "#ffffff");
          }
      });

      var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "&appid=" + APIKey;
      $.ajax({
          url: forecastURL,
          method: "GET"
      }).then(function (response) {
          console.log(response);
          console.log(response.list);

          $("#d1d").html(moment().add(1, 'days').format("l"));
          $("#d2d").html(moment().add(2, 'days').format("l"));
          $("#d3d").html(moment().add(3, 'days').format("l"));
          $("#d4d").html(moment().add(4, 'days').format("l"));
          $("#d5d").html(moment().add(5, 'days').format("l"));

          var iconID0 = response.list[0].weather[0].icon;
          $('#d1i').attr("src", "http://openweathermap.org/img/wn/" + iconID0 + "@2x.png");
          var tempF1 = ((response.list[0].main.temp - 273.15) * 1.80 + 32).toFixed(2);
          $("#d1t").text("Temp: " + tempF1 + "°F");
          $("#d1h").text("Humidity: " + response.list[0].main.humidity + "%");


          var iconID1 = response.list[1].weather[0].icon;
          $('#d2i').attr("src", "http://openweathermap.org/img/wn/" + iconID1 + "@2x.png");
          var tempF2 = ((response.list[1].main.temp - 273.15) * 1.80 + 32).toFixed(2);
          $("#d2t").text("Temp: " + tempF2 + "°F");
          $("#d2h").text("Humidity: " + response.list[1].main.humidity + "%");


          var iconID2 = response.list[2].weather[0].icon;
          $('#d3i').attr("src", "http://openweathermap.org/img/wn/" + iconID2 + "@2x.png");
          var tempF3 = ((response.list[2].main.temp - 273.15) * 1.80 + 32).toFixed(2);
          $("#d3t").text("Temp: " + tempF3 + "°F");
          $("#d3h").text("Humidity: " + response.list[2].main.humidity + "%");


          var iconID3 = response.list[3].weather[0].icon;
          $('#d4i').attr("src", "http://openweathermap.org/img/wn/" + iconID3 + "@2x.png");
          var tempF4 = ((response.list[3].main.temp - 273.15) * 1.80 + 32).toFixed(2);
          $("#d4t").text("Temp: " + tempF4 + "°F");
          $("#d4h").text("Humidity: " + response.list[3].main.humidity + "%");


          var iconID4 = response.list[4].weather[0].icon;
          $('#d5i').attr("src", "http://openweathermap.org/img/wn/" + iconID4 + "@2x.png");
          var tempF5 = ((response.list[4].main.temp - 273.15) * 1.80 + 32).toFixed(2);
          $("#d5t").text("Temp: " + tempF5 + "°F");
          $("#d5h").text("Humidity: " + response.list[4].main.humidity + "%");

      });
  });
}


}); 




    






