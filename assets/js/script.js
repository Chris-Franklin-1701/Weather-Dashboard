//global variables

var formSubmit = $("#search-btn");
//var searchBtn = $("#search-btn");
var clearBtn = $("#clear-btn");
var currentLocation = $("#currentLocation");
var currentLongitude = $("#lon");
var currentLatitude = $("lat");
var currentTemp = $("#temperature");
var currentFeels = $("#feels-like");
var currentMax = $("#temp-max");
var currentMin = $("#temp-min");
var currentPressure = $("#pressure");
var currentHumidity = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUvIndex = $("#uv-index");
var sCity = [];


//function find(c) {
  //  for (var i = 0; i < sCity.length; i++){
   //     if (c.toUpperCase()===sCity[i]){
  //          return -1
  //      }
 //   }
//    return 1;
//}

//var APIkey = "d06b4b9bd23164f4a665e77178e06ab9";

$(formSubmit).on("click",function(event){
    var searchLocation = $("#search-value");
    var location;
    event.preventDefault();
    console.log("worked?");
    location = searchLocation.val().trim();
    console.log(location);
        currentWeather(location);
});

function currentWeather(location) {
    var requestedURL = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&appid=d06b4b9bd23164f4a665e77178e06ab9";


    fetch(requestedURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
                console.log(data);
        

        var lon = data.coord.lon
        var lat = data.coord.lat
        var lastURL ="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,daily&appid=d06b4b9bd23164f4a665e77178e06ab9";

    fetch(lastURL)
        .then(function(steve){
            return steve.json();
    })
    .then(function(karen){
            console.log(karen);

    
        //}else{
          //  alert("Error");
       // };
    //});
        
        //var weatherIcon = (data.weather[0].icon);
        var iconUrl = "http://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png";
        var currentDate = new Date(data.dt*1000).toLocaleDateString();
        $(currentLocation).html(data.name + " ("+currentDate+") "+"<img src="+iconUrl+">");
        $(currentTemp).html(data.main.temp);
        $(currentWindSpeed).html(data.wind.speed);
        $(currentLongitude).html(data.coord.lon);
        $(currentLatitude).html(data.coord.lat);
        $(currentFeels).html(data.main.feels_like);
        $(currentPressure).html(data.main.pressure);
        $(currentHumidity).html(data.main.humidity);
        $(currentMax).html(data.main.temp_max);
        $(currentMin).html(data.main.temp_min);
        
        var uvKaren = karen.current.uvi;
        var btn = $("<span>").addClass("btn btn-sm").text(uvKaren);
        if (uvKaren < 3){
            btn.addClass("btn-success");
        } else if (uvKaren < 7){
            btn.addClass("btn-warning");
        } else {
            btn.addClass("btn-danger");
        }

        $(currentUvIndex).html(btn);

        
        
        /*UVIndex(data.coord.lon, data.coord.lat);
        forcast(data.id);
        if(data.cod===200) {
            searchLocation=JSON.parse(localStorage.getItem("locationName"));
            console.log(searchLocation);
            if (searchLocation === null) {
                searchLocation=[];
                searchLocation.push(location.toUpperCase()
                );
                localStorage.setItem("locationName",JSON.stringify(searchLocation));
                addToList(location);
            }else{
                if(find(location)>0){
                    searchLocation.push(location.toUpperCase());
                    localStorage.setItem("locationName",JSON.stringify(searchLocation));
                    addToList(location);
                }
            }
        };*/
    });
    });
};



/*function UVIndex (ln,lt) {
    var uvindexURL = "https://apiopenweathermap.org/data/2.5/uvi?appid="+APIkey+"&lat="+lt+"&lon="+ln+"&units=imperial";

    $ajax({
        url:uvindexURL,
        method: "GET",
    }).then(function(response){
        if (response.ok){
        response.json().then(function(data){
            console.log(data)
        })
    }else{
        alert("Error"+response.statusText);
    };
        $(currentUvIndex).html(data.value);
    });
}

//$("#search-btn").on("click", showWeather);&*/