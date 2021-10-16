//global variables
var formSubmit = $("#search-btn");
//var searchBtn = $("#search-btn");
var historyEl = $("#listHistory");
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
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);

$(document).ready(function(){
    $("#future-weather").hide();
    currentWeather(searchHistory[searchHistory.length-1])
    futureForecast(searchHistory[searchHistory.length-1]);
});
function find(l) {
    for (var i = 0; i < sCity.length; i++){
        if (l.toUpperCase()===sCity[i]){
            return -1
        }
    }
    return 1;
}

//var APIkey = "d06b4b9bd23164f4a665e77178e06ab9";

$(formSubmit).on("click",function(event){
    var location;
    var searchLocation = $("#search-value");
    event.preventDefault();
    console.log("worked?");
    location = searchLocation.val().trim();
    console.log(location);
        currentWeather(location);
        futureForecast(location);
        $("#future-weather").show();
        searchHistory.push(location);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        getSearchHistory();
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
        var lastURL ="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=d06b4b9bd23164f4a665e77178e06ab9";

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
        var iconUrl = "https://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png";
        var currentDate = new Date(data.dt*1000).toLocaleDateString();
        $(currentLocation).html(data.name + " ("+currentDate+") "+"<img src="+iconUrl+">");
        $(currentTemp).html(data.main.temp+"°F");
        $(currentWindSpeed).html(data.wind.speed+" MPH");
        $(currentLongitude).html(data.coord.lon);
        $(currentLatitude).html(data.coord.lat);
        $(currentFeels).html(data.main.feels_like+"°F");
        $(currentPressure).html(data.main.pressure+" inHG");
        $(currentHumidity).html(data.main.humidity+"%");
        $(currentMax).html(data.main.temp_max+"°F");
        $(currentMin).html(data.main.temp_min+"°F");
        
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

        if (lastURL.cod==200) {
            sCity=JSON.parse(localStorage.getItem("locationName"));
            console.log(sCity);
            if (sCity==null) {
                sCity=[];
                sCity.push(location.toUpperCase());
                localStorage.setItem("locationName",JSON.stringify(sCity));
                addToList(location);
            }else{
                if (find(location)>0){
                    sCity.push(location.toUpperCase());
                    localStorage.setItem("locationName",JSON.stringify(sCity));
                    addToList(location);
                }
            }
        }
        
        
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

function futureForecast(location) {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&appid=d06b4b9bd23164f4a665e77178e06ab9";


    fetch(requestURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
                console.log(data);
        

        var lon = data.coord.lon
        var lat = data.coord.lat
        var lastURL ="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=d06b4b9bd23164f4a665e77178e06ab9";

    fetch(lastURL)
        .then(function(steve){
            return steve.json();
    })
    .then(function(karen){
            console.log(karen);
    
        for (i = 0; i < 7; i++){
            var date = new Date((karen.daily[(i+1)-1].dt)*1000).toLocaleDateString();
            var icon = karen.daily[(i+1)-1].weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/wn/"+icon+".png";
            var temp = karen.daily[(i+1)-1].temp.day+"°F";
            var humidity = karen.daily[(i+1)-1].humidity+"%";
            var pressure = karen.daily[(i+1)-1].pressure+" inHG";
            var uvIndex = karen.daily[(i+1)-1].uvi;
            var uvBtn = $("<span>").addClass("btn btn-sm").text(uvIndex);
            if (uvIndex < 3){
                uvBtn.addClass("btn-success");
            } else if (uvIndex < 7){
                uvBtn.addClass("btn-warning");
            } else {
                uvBtn.addClass("btn-danger");
            };
    
            



            
            $("#futureDate"+i).html(date);
            $("#futureImg"+i).html("<img src="+iconUrl+">");
            $("#futureTemp"+i).html(temp);
            $("#futureHumidity"+i).html(humidity);
            $("#futurePressure"+i).html(pressure);
            $("#futureUvindex"+i).html(uvBtn);
        }


    });


    });

    

}

$(clearBtn).on("click",function(){
    console.log("worked!")
    localStorage.removeItem("search");
    document.location.reload();
    getSearchHistory();
});

    /*function getSearchHistory(){
        var historyItem = document.createElement("input");
        historyItem.setAttribute("type","text");
        historyItem.setAttribute("readonly",true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value",searchHistory[searchHistory.length-1]);
        historyItem.addEventListener("click",function(){
            currentWeather(historyItem.value);
        })
        historyEl.append(historyItem);
    }*/

getSearchHistory();
if (searchHistory.length > 0){
    currentWeather(searchHistory[searchHistory.length]);
    futureForecast(searchHistory[searchHistory.length]);
};


function getSearchHistory(){
    historyEl.html("");
    for (var i = 0; i < searchHistory.length;i++){
        var historyItem = document.createElement("input");
        historyItem.setAttribute("type","text");
        historyItem.setAttribute("readonly",true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value",searchHistory[i]);
        historyItem.addEventListener("click",function(){
            currentWeather(historyItem.value);
        })
        historyEl.append(historyItem);
    }
}
/*function clearHistory(event){
    sCity = [];
    localStorage.removeItem(location);
    document.location.reload();
}*/




/*function addToList(location) {
    var listEl = $("<li>"+location.toUpperCase()+"</li");
    $(listEl).attr("class", "list-group-item", "d-block");
    $(listEl).attr("value",location);
    $(".list-group").append(listEl);
}

function invokePastLocation(event) {
    var liEl = event.target;
    if (event.target.matches("li")){
        location=liEl.textContent.trim();
        currentWeather(location);
    }
}

function loadLastSearch() {
    $("ul").empty();
    var sCity = JSON.parse(localStorage.getItem("locationName"));
    if(sCity !== null) {
        sCity = JSON.parse(localStorage.getItem("locationName"));
        for(i=0; i < sCity.length; i++) {
            addToList(sCity[i]);
        }
        city=sCity[i+1];
        currentWeather(location);
    }
}

/*function clearSearch(event) {
    event.preventDefault();
    sCity=[];
    localStorage.removeItem("locationName");
    document.location.reload();
}



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